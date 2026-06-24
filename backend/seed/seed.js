import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import Pet from "../models/Pet.js";
import SuccessStory from "../models/SuccessStory.js";

dotenv.config();

const petImages = [
  "https://images.unsplash.com/photo-1558788353-f76d92427f16",
  "https://images.unsplash.com/photo-1517849845537-4d257902861a",
  "https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a",
  "https://images.unsplash.com/photo-1583337130417-3346a1be7dee",
];

const pets = [
  { name: "Buddy", species: "Dog", breed: "Labrador Retriever", age: 2, gender: "Male", description: "Buddy is a playful and energetic Labrador who loves long walks and belly rubs." },
  { name: "Luna", species: "Cat", breed: "Persian", age: 1, gender: "Female", description: "Luna is a calm and affectionate Persian cat who enjoys lounging by the window." },
  { name: "Max", species: "Dog", breed: "German Shepherd", age: 3, gender: "Male", description: "Max is loyal, intelligent and great with families." },
  { name: "Milo", species: "Cat", breed: "Siamese", age: 2, gender: "Male", description: "Milo is curious and talkative, always up for some attention." },
  { name: "Coco", species: "Rabbit", breed: "Holland Lop", age: 1, gender: "Female", description: "Coco is a gentle bunny who loves fresh veggies and quiet cuddles." },
  { name: "Charlie", species: "Dog", breed: "Beagle", age: 4, gender: "Male", description: "Charlie has a great nose for adventure and a heart full of love." },
  { name: "Bella", species: "Cat", breed: "Maine Coon", age: 3, gender: "Female", description: "Bella is a gentle giant who gets along with everyone." },
  { name: "Rocky", species: "Dog", breed: "Bulldog", age: 5, gender: "Male", description: "Rocky is a low-energy companion who loves naps and snacks." },
  { name: "Daisy", species: "Rabbit", breed: "Lionhead", age: 2, gender: "Female", description: "Daisy has a fluffy mane and a sweet, curious personality." },
  { name: "Tweety", species: "Bird", breed: "Budgerigar", age: 1, gender: "Male", description: "Tweety is a cheerful little budgie who loves to sing in the morning." },
  { name: "Simba", species: "Cat", breed: "Bengal", age: 2, gender: "Male", description: "Simba is athletic and playful with striking markings." },
  { name: "Rosie", species: "Dog", breed: "Poodle", age: 3, gender: "Female", description: "Rosie is hypoallergenic, smart, and easy to train." },
  { name: "Kiwi", species: "Bird", breed: "Cockatiel", age: 1, gender: "Female", description: "Kiwi loves whistling tunes and perching on shoulders." },
  { name: "Oreo", species: "Cat", breed: "Domestic Shorthair", age: 1, gender: "Male", description: "Oreo is a black-and-white tuxedo cat with a mischievous streak." },
  { name: "Thumper", species: "Rabbit", breed: "Dutch", age: 1, gender: "Male", description: "Thumper is energetic and loves hopping around the garden." },
  { name: "Zoe", species: "Dog", breed: "Golden Retriever", age: 2, gender: "Female", description: "Zoe is friendly, gentle, and wonderful with children." },
  { name: "Shadow", species: "Cat", breed: "Russian Blue", age: 4, gender: "Male", description: "Shadow is quiet, elegant, and deeply affectionate once he trusts you." },
  { name: "Peanut", species: "Bird", breed: "Lovebird", age: 1, gender: "Male", description: "Peanut bonds closely with their owner and loves company." },
  { name: "Snowy", species: "Rabbit", breed: "Angora", age: 2, gender: "Female", description: "Snowy has a luxurious white coat and a calm temperament." },
  { name: "Duke", species: "Dog", breed: "Boxer", age: 3, gender: "Male", description: "Duke is muscular, playful, and incredibly loyal to his family." },
];

const successStories = [
  { petName: "Buddy", adopterName: "The Sharma Family", title: "Buddy Found His Forever Home", story: "After months of searching, the Sharma family welcomed Buddy into their home and he transformed their daily walks into joyful adventures.", testimonial: "Buddy brought so much joy into our lives!", featured: true },
  { petName: "Luna", adopterName: "Priya Nair", title: "Luna's Quiet Companionship", story: "Priya adopted Luna during a difficult year, and Luna's calm presence helped her through it.", testimonial: "Luna is the best decision I ever made.", featured: true },
  { petName: "Max", adopterName: "The Iyer Household", title: "Max the Protector", story: "Max quickly became the family's loyal guardian and best friend to the kids.", testimonial: "Max is family now.", featured: false },
  { petName: "Coco", adopterName: "Ananya Rao", title: "A Bunny's New Beginning", story: "Coco hopped into Ananya's apartment and into her heart within days.", testimonial: "Coco is the sweetest bunny ever.", featured: false },
  { petName: "Tweety", adopterName: "The Verma Family", title: "Songs Every Morning", story: "Tweety's cheerful chirping now fills the Verma household every single morning.", testimonial: "Our mornings are happier with Tweety around.", featured: true },
];

const users = [
  { name: "Admin User", email: "admin@happytails.com", password: "admin123", role: "admin" },
  { name: "Test User One", email: "user1@happytails.com", password: "user1234", role: "user" },
  { name: "Test User Two", email: "user2@happytails.com", password: "user1234", role: "user" },
];

const seedData = async () => {
  try {
    await connectDB();

    await Promise.all([User.deleteMany(), Pet.deleteMany(), SuccessStory.deleteMany()]);

    const createdUsers = await User.create(users);
    const adminUser = createdUsers.find((u) => u.role === "admin");

    const petsWithImages = pets.map((pet, i) => ({
      ...pet,
      images: [petImages[i % petImages.length]],
      vaccinated: true,
      neutered: i % 2 === 0,
      shelterLocation: "Hyderabad, Telangana",
      shelterContact: "contact@happytails.com",
      createdBy: adminUser._id,
    }));

    const createdPets = await Pet.create(petsWithImages);

    const storiesWithPets = successStories.map((story) => {
      const matchedPet = createdPets.find((p) => p.name === story.petName);
      return { ...story, pet: matchedPet?._id, images: [petImages[0]] };
    });

    await SuccessStory.create(storiesWithPets);

    console.log("✅ Seed data inserted successfully");
    console.log(`Users: ${createdUsers.length}, Pets: ${createdPets.length}, Stories: ${storiesWithPets.length}`);
    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
};

seedData();