import { BadRequestException, Controller, Get, Param } from "@nestjs/common";
import { promises as fs } from "fs";
import { SkipAuth } from "src/core/guards/auth-guard";

@Controller("translations")
export class TranslationController {
  /**
   * Retrieves translations for a specified language.
   *
   * This endpoint fetches the translation file corresponding to the language
   * code provided in the request parameter. It reads the language JSON file from
   * the server, parses it, and returns the translations as a JSON object.
   * If the file does not exist or cannot be read, an error is thrown.
   *
   * @param {string} lang - The language code parameter from the request (e.g., "en" for English).
   * @returns {Record<string, string>} - The parsed translation key-value pairs.
   */
  @SkipAuth()
  @Get(":lang")
  async getTranslations(
    @Param("lang") lang: string
  ): Promise<Record<string, string>> {
    const filePath = `src/i18n/${lang}/language.json`;
    try {
      const translation = await fs.readFile(filePath, "utf8");
      return JSON.parse(translation);
    } catch (error) {
      // Handle error
      throw new BadRequestException("Translations not found");
    }
  }
}
