import { NextRequest, NextResponse } from 'next/server';
import { PokemonService } from '@/services/pokemon.service';
import { PokemonApiError } from '@/types/api.types';
import type { ApiResponse, Pokemon } from '@/types/api.types';

// Create service instance (could be singleton in production)
const pokemonService = new PokemonService();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<Pokemon>>> {
  const startTime = Date.now();
  
  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json({
        data: null as any,
        success: false,
        error: 'Pokemon ID or name is required',
        timestamp: Date.now(),
      }, { status: 400 });
    }

    // Validate input format
    const isValidId = /^\d+$/.test(id) || /^[a-z-]+$/.test(id);
    if (!isValidId) {
      return NextResponse.json({
        data: null as any,
        success: false,
        error: 'Invalid Pokemon ID or name format',
        timestamp: Date.now(),
      }, { status: 400 });
    }

    const pokemon = await pokemonService.getPokemon(id);
    const duration = Date.now() - startTime;
    
    console.log(`✓ Served Pokemon ${pokemon.name} in ${duration}ms`);
    
    return NextResponse.json({
      data: pokemon,
      success: true,
      timestamp: Date.now(),
    });

  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`✗ Pokemon API error after ${duration}ms:`, error);
    
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