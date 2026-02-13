import {z} from "zod";

export const EnergyTypeSchema = z.enum([
  "Colorless",
  "Darkness",
  "Dragon",
  "Fairy",
  "Fighting",
  "Fire",
  "Grass",
  "Lightning",
  "Metal",
  "Psychic",
  "Water"
])

export const AttackCostSchema = z.object({
  type: EnergyTypeSchema,
  count: z.number()
})

export const AttackSchema = z.object({
  cost:  z.array(EnergyTypeSchema),
  name: z.string(),
  effect: z.string().optional(),
  damage: z.union([z.string(), z.number()]).optional()
})

export const AbilitySchema = z.object({
  type: z.string(),
  name: z.string(),
  effect: z.string()
})

export const WeaknessSchema = z.object({
  type: EnergyTypeSchema,
  value: z.string().optional()
})

export const ResistanceSchema = z.object({
  type: EnergyTypeSchema,
  value: z.string().optional()
})

export const SetSchema = z.object({
  id: z.string(),
  name: z.string(),
  logo: z.string().url().optional(),
  symbol: z.string().url().optional(),
  cardCount: z.object({
    total: z.number(),
    offical: z.number()
  }).optional()
})

export const LegalSchema = z.object({
  standard: z.boolean().optional(),
  expanded: z.boolean().optional(),
  unlimited: z.boolean().optional(),
})

export const VariantsSchema = z.object({
  normal: z.boolean().optional(),
  reverse: z.boolean().optional(),
  holo: z.boolean().optional(),
  firstEdition: z.boolean().optional(),
})

export const PokemonCardSchema = z.object({
  // Basic Info
  id: z.string(),
  localId: z.string(),
  name: z.string(),
  
  // Images
  images: z.string().url().optional(),

  // Card Details
  hp: z.number().optional(),
  types: z.array(EnergyTypeSchema).optional(),
  evolveFrom: z.string().optional(),

  // Description
  description: z.string().optional(),
  level: z.union([z.string(), z.number()]).optional(),
  stage: z.enum(['Basic', 'Stage1', 'Stage2', 'BREAK', 'LEGEND', 'MEGA', 'GX', 'V', 'VMAX','VSTAR']).optional(),

  suffix: z.string().optional(),

  item: z.string().optional(),

  attacks: z.array(AttackSchema).optional(),
  abilities: z.array(AbilitySchema).optional(),

  weakness: z.array(WeaknessSchema).optional(),
  resistance: z.array(ResistanceSchema).optional(),

  retreat: z.number().optional(),
  set: SetSchema,
  cardNumber: z.string(),

  rarity: z.string().optional(),

  artist: z.string().optional(),
  
  legal: LegalSchema.optional(),

  variants: VariantsSchema.optional(),
  
  category: z.enum(['Pokemon', 'Trainer', 'Energy']).optional(),

  regulationMark: z.string().optional(),

  dexId: z.array(z.number()).optional()
});

// Response Schema
export const PokemonCardResponseSchame = PokemonCardSchema;
export const PokemonCardListResponseSchema = z.array(PokemonCardSchema);

// Serach/Filter Response
export const PokemonCardSearchResponseSchema = z.object({
  cards: z.array(PokemonCardSchema),
  count: z.number().optional()
})

// Types
export type EnergyType = z.infer<typeof EnergyTypeSchema>
export type Attack = z.infer<typeof AttackSchema>;
export type Ability = z.infer<typeof AbilitySchema>
export type Weakness = z.infer<typeof WeaknessSchema>
export type Resistance = z.infer<typeof ResistanceSchema>
export type PokemonCard = z.infer<typeof PokemonCardSchema>
export type Set = z.infer<typeof SetSchema>