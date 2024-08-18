<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;

class UsuarioController extends Controller
{

    public function index()
    {
        $usuarios = Usuario::all();
        return response()->json($usuarios);
    }

    public function store(Request $request)
        {
            $validatedData = $request->validate([
                'nome' => 'required|string|max:100',
                'email' => 'required|string|email|max:100',
                'data' => 'required|string|max:100',
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
    // criar uma função para deletar um usuario em especifico passado na URL
    public function delete($id)
    {
        $usuario = Usuario::find($id);
        $usuario->delete();
        return response()->json(['message' => 'Usuário deletado com sucesso', 'user_name' => $usuario->nome], 200);
    }

    public function update(Request $request, $id)
    {
        $usuario = Usuario::find($id);
        if(is_null($usuario)){
            return response()->json(['message' => 'Usuário não encontrado'], 404);
        }
        $validatedData = $request->validate([
            'nome' => 'required|string|max:100',
            'email' => 'required|string|email|max:100',
            'cpf' => 'required|numeric',
            'telefone' => 'required|numeric',
            'animal' => 'required|string|max:100',
            'nome_animal' => 'required|string|max:100',
            'raca_animal' => 'required|string|max:100',
            'servico' => 'required|string|max:100',
            'data' => 'required|string|max:100',
        ]);
        $usuario->update($validatedData);
        return response()->json(['message' => 'Usuário atualizado com sucesso', 'date' => $usuario], 200);
    }

}
