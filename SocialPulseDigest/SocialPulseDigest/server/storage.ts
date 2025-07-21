import { users, brands, digests, digestMetrics, type User, type Brand, type Digest, type DigestMetric, type InsertUser, type InsertBrand, type InsertDigest } from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Brand operations
  getBrand(id: number): Promise<Brand | undefined>;
  getBrandsByUserId(userId: number): Promise<Brand[]>;
  createBrand(brand: InsertBrand): Promise<Brand>;
  
  // Digest operations
  getDigest(id: number): Promise<Digest | undefined>;
  getDigestsByBrandId(brandId: number): Promise<Digest[]>;
  createDigest(digest: InsertDigest): Promise<Digest>;
  
  // Digest metrics operations
  getDigestMetrics(digestId: number): Promise<DigestMetric | undefined>;
  createDigestMetrics(metrics: Omit<DigestMetric, 'id'>): Promise<DigestMetric>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private brands: Map<number, Brand>;
  private digests: Map<number, Digest>;
  private digestMetrics: Map<number, DigestMetric>;
  private currentUserId: number;
  private currentBrandId: number;
  private currentDigestId: number;
  private currentMetricsId: number;

  constructor() {
    this.users = new Map();
    this.brands = new Map();
    this.digests = new Map();
    this.digestMetrics = new Map();
    this.currentUserId = 1;
    this.currentBrandId = 1;
    this.currentDigestId = 1;
    this.currentMetricsId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = {
      ...insertUser,
      id,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async getBrand(id: number): Promise<Brand | undefined> {
    return this.brands.get(id);
  }

  async getBrandsByUserId(userId: number): Promise<Brand[]> {
    return Array.from(this.brands.values()).filter(brand => brand.userId === userId);
  }

  async createBrand(insertBrand: InsertBrand): Promise<Brand> {
    const id = this.currentBrandId++;
    const brand: Brand = {
      ...insertBrand,
      id,
      createdAt: new Date(),
    };
    this.brands.set(id, brand);
    return brand;
  }

  async getDigest(id: number): Promise<Digest | undefined> {
    return this.digests.get(id);
  }

  async getDigestsByBrandId(brandId: number): Promise<Digest[]> {
    return Array.from(this.digests.values()).filter(digest => digest.brandId === brandId);
  }

  async createDigest(insertDigest: InsertDigest): Promise<Digest> {
    const id = this.currentDigestId++;
    const digest: Digest = {
      ...insertDigest,
      id,
      createdAt: new Date(),
    };
    this.digests.set(id, digest);
    return digest;
  }

  async getDigestMetrics(digestId: number): Promise<DigestMetric | undefined> {
    return Array.from(this.digestMetrics.values()).find(metrics => metrics.digestId === digestId);
  }

  async createDigestMetrics(insertMetrics: Omit<DigestMetric, 'id'>): Promise<DigestMetric> {
    const id = this.currentMetricsId++;
    const metrics: DigestMetric = {
      ...insertMetrics,
      id,
    };
    this.digestMetrics.set(id, metrics);
    return metrics;
  }
}

export const storage = new MemStorage();
