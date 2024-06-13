import { BadRequestException, Controller, Get, Param } from "@nestjs/common";
import { readFileSync } from "fs";
import { SkipAuth } from "src/core/guards/auth-guard";

@Controller("translations")
export class TranslationController {
  @SkipAuth()
  @Get(":lang")
  getTranslations(@Param("lang") lang: string): Record<string, string> {
    try {
      const translation = readFileSync(
        `src/i18n/${lang}/language.json`,
        "utf8"
      );
      return JSON.parse(translation);
    } catch (error) {
      // Handle error
      new BadRequestException("Translations not found");
    }
  }
}
