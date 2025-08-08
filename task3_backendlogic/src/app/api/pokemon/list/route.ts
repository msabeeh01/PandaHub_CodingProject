// ==========================================
// FILE: src/app/api/pokemon/list/route.ts
// API route for Pokemon list with pagination
// ==========================================

import { NextRequest, NextResponse } from 'next/server';
import { PokemonService } from '@/services/pokemon.service';
import { PokemonApiError } from '@/types/api.types';
import type { ApiResponse, PokemonListItem } from '@/types/api.types';

// Create service instance (could be singleton in production)
const pokemonService = new PokemonService();

export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse<PokemonListItem[]>>> {
  const startTime = Date.now();
  
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse and validate parameters
    const limit = Math.min(Math.max(parseInt(searchParams.get('limit') || '20'), 1), 100);
    const offset = Math.max(parseInt(searchParams.get('offset') || '0'), 0);
    
    // Validate input format
    if (isNaN(limit) || isNaN(offset)) {
      return NextResponse.json({
        data: null as any,
        success: false,
        error: 'Invalid limit or offset parameter',
        timestamp: Date.now(),
      }, { status: 400 });
    }
    
    const response = await pokemonService.getPokemonList(limit, offset);
    
    // Transform the response to match our API format
    const pokemonList: PokemonListItem[] = response.results.map((pokemon: any, index: number) => ({
      id: offset + index + 1,
      name: pokemon.name,
      url: pokemon.url,
      sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${offset + index + 1}.png`
    }));
    
    const duration = Date.now() - startTime;
    
    console.log(`✓ Served ${pokemonList.length} Pokemon (limit: ${limit}, offset: ${offset}) in ${duration}ms`);
    
    return NextResponse.json({
      data: pokemonList,
      success: true,
      timestamp: Date.now(),
      pagination: {
        limit,
        offset,
        total: response.count || 1010,
        hasNext: offset + limit < (response.count || 1010),
        hasPrevious: offset > 0,
      }
    });
    
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`✗ Pokemon list API error after ${duration}ms:`, error);
    
    if (error instanceof PokemonApiError) {
      const statusCode = error.statusCode === 404 ? 404 : 500;
      
      return NextResponse.json({
        data: null as any,
        success: false,
        error: error.message,
        timestamp: Date.now(),
      }, { status: statusCode });
    }
    
    return NextResponse.json({
      data: null as any,
      success: false,
      error: 'Internal server error',
      timestamp: Date.now(),
    }, { status: 500 });
  }
}