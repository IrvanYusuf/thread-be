import { ZodType, ZodObject } from "zod";

class Validation {
  /**
   * Fungsi validate generik yang mengembalikan tipe inferensi dari skema Zod.
   * * @param schema Skema Zod (harus berupa objek).
   * @param data Data yang akan divalidasi (tipe unknown agar fleksibel).
   * @returns Data yang telah divalidasi dengan tipe inferensi Zod.
   */
  static validate<T extends ZodObject>(schema: T, data: unknown): T["_output"] {
    return schema.parse(data);
  }
}

export default Validation;
