
/**
 * Base resource interface for PokeAPI entities
 */
export interface BaseResource {
  readonly id: number;
  readonly name: string;
}

/**
 * Reference to another API resource
 */
export interface NamedAPIResource {
  readonly name: string;
  readonly url: string;
}

/**
 * Core Pokemon data structure
 */
export interface Pokemon extends BaseResource {
  readonly base_experience: number;
  readonly height: number;
  readonly weight: number;
  readonly abilities: PokemonAbility[];
  readonly forms: NamedAPIResource[];
  readonly game_indices: GameIndex[];
  readonly held_items: PokemonHeldItem[];
  readonly location_area_encounters: string;
  readonly moves: PokemonMove[];
  readonly sprites: PokemonSprites;
  readonly species: NamedAPIResource;
  readonly stats: PokemonStat[];
  readonly types: PokemonType[];
}

export interface PokemonAbility {
  readonly is_hidden: boolean;
  readonly slot: number;
  readonly ability: NamedAPIResource;
}

export interface GameIndex {
  readonly game_index: number;
  readonly version: NamedAPIResource;
}

export interface PokemonHeldItem {
  readonly item: NamedAPIResource;
  readonly version_details: PokemonHeldItemVersion[];
}

export interface PokemonHeldItemVersion {
  readonly version: NamedAPIResource;
  readonly rarity: number;
}

export interface PokemonMove {
  readonly move: NamedAPIResource;
  readonly version_group_details: PokemonMoveVersion[];
}

export interface PokemonMoveVersion {
  readonly move_learn_method: NamedAPIResource;
  readonly version_group: NamedAPIResource;
  readonly level_learned_at: number;
}

export interface PokemonSprites {
  readonly front_default: string | null;
  readonly front_shiny: string | null;
  readonly front_female: string | null;
  readonly front_shiny_female: string | null;
  readonly back_default: string | null;
  readonly back_shiny: string | null;
  readonly back_female: string | null;
  readonly back_shiny_female: string | null;
  readonly other?: {
    readonly dream_world?: {
      readonly front_default: string | null;
    };
    readonly 'official-artwork'?: {
      readonly front_default: string | null;
    };
  };
}

export interface PokemonStat {
  readonly base_stat: number;
  readonly effort: number;
  readonly stat: NamedAPIResource;
}

export interface PokemonType {
  readonly slot: number;
  readonly type: NamedAPIResource;
}

export interface PaginatedResponse<T> {
  readonly count: number;
  readonly next: string | null;
  readonly previous: string | null;
  readonly results: T[];
}

export interface PokemonListItem {
  readonly name: string;
  readonly url: string;
}

export interface PokemonSpecies extends BaseResource {
  readonly order: number;
  readonly gender_rate: number;
  readonly capture_rate: number;
  readonly base_happiness: number;
  readonly is_baby: boolean;
  readonly is_legendary: boolean;
  readonly is_mythical: boolean;
  readonly hatch_counter: number;
  readonly has_gender_differences: boolean;
  readonly forms_switchable: boolean;
  readonly growth_rate: NamedAPIResource;
  readonly pokedex_numbers: PokemonSpeciesDexEntry[];
  readonly egg_groups: NamedAPIResource[];
  readonly color: NamedAPIResource;
  readonly shape: NamedAPIResource;
  readonly evolves_from_species: NamedAPIResource | null;
  readonly evolution_chain: { readonly url: string };
  readonly habitat: NamedAPIResource | null;
  readonly generation: NamedAPIResource;
  readonly names: Name[];
  readonly flavor_text_entries: FlavorText[];
  readonly form_descriptions: Description[];
  readonly genera: Genus[];
  readonly varieties: PokemonSpeciesVariety[];
}

export interface PokemonSpeciesDexEntry {
  readonly entry_number: number;
  readonly pokedex: NamedAPIResource;
}

export interface Name {
  readonly name: string;
  readonly language: NamedAPIResource;
}

export interface FlavorText {
  readonly flavor_text: string;
  readonly language: NamedAPIResource;
  readonly version: NamedAPIResource;
}

export interface Description {
  readonly description: string;
  readonly language: NamedAPIResource;
}

export interface Genus {
  readonly genus: string;
  readonly language: NamedAPIResource;
}

export interface PokemonSpeciesVariety {
  readonly is_default: boolean;
  readonly pokemon: NamedAPIResource;
}

export interface Type extends BaseResource {
  readonly damage_class: NamedAPIResource;
  readonly damage_relations: TypeRelations;
  readonly game_indices: GameIndex[];
  readonly generation: NamedAPIResource;
  readonly move_damage_class: NamedAPIResource;
  readonly names: Name[];
  readonly pokemon: TypePokemon[];
  readonly moves: NamedAPIResource[];
}

export interface TypeRelations {
  readonly no_damage_to: NamedAPIResource[];
  readonly half_damage_to: NamedAPIResource[];
  readonly double_damage_to: NamedAPIResource[];
  readonly no_damage_from: NamedAPIResource[];
  readonly half_damage_from: NamedAPIResource[];
  readonly double_damage_from: NamedAPIResource[];
}

export interface TypePokemon {
  readonly slot: number;
  readonly pokemon: NamedAPIResource;
}
