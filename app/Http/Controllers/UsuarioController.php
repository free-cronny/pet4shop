<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;

class UsuarioController extends Controller
{
    public function store(Request $request)
        {
            $validatedData = $request->validate([
                'nome' => 'required|string|max:100',
                'email' => 'required|string|email|max:100',
                'cpf' => 'required|numeric',
                'telefone' => 'required|numeric',
                'animal' => 'required|string|max:100',
                'nome_animal' => 'required|string|max:100',
                'raca_animal' => 'required|string|max:100',
                'servico' => 'required|string|max:100',
            ]);

            $usuario = Usuario::create($validatedData);

            return response()->json(['message' => 'Usuário cadasstrado com sucesso', 'date' => $usuario], 201);
        }
}
