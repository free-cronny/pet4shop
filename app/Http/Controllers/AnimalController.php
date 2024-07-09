<?php

namespace App\Http\Controllers;

use App\Models\Animais;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AnimalController extends Controller
{
    // Cadastrar um animal
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nome' => 'required|string|max:100',
            'data' => 'required|string|max:100',
            'email' => 'required|email|max:100',
            'cpf' => 'required|string|max:11',
            'telefone' => 'required|string|max:11',
            'nome_animal' => 'required|string|max:100',
            'raca_animal' => 'required|string|max:100',
            'servico' => 'required|string|max:100',
        ]);

        $animal = Animais::create([
            'nome' => $validatedData['nome'],
            'email' => $validatedData['email'],
            'cpf' => $validatedData['cpf'],
            'data' => $validatedData['data'],
            'telefone' => $validatedData['telefone'],
            'nome_animal' => $validatedData['nome_animal'],
            'raca_animal' => $validatedData['raca_animal'],
            'servico' => $validatedData['servico'],
            'user_id' => auth()->user()->id,
        ]);

        return response()->json($animal, 201);
    }

    // Listar todos os animais do usuário logado
    public function listarAnimaisDoUsuarioLogado()
    {
        $animais = auth()->user()->role === 'admin' 
            ? Animais::all()
            : Animais::where('user_id', auth()->user()->id)->get();

        return response()->json($animais, 200);
    }

    // Filtrar animais por vários campos
    public function filtrarAnimais(Request $request)
    {
        $query = Animais::query();

        $filters = [
            'nome' => 'like',
            'email' => 'like',
            'data' => '=',
            'cpf' => 'like',
            'telefone' => 'like',
            'nome_animal' => 'like',
            'raca_animal' => 'like',
            'servico' => '='
        ];

        foreach ($filters as $field => $operator) {
            if ($request->filled($field)) {
                $query->where($field, $operator === 'like' ? 'like' : '=', $operator === 'like' ? '%' . $request->$field . '%' : $request->$field);
            }
        }

        $animais = $query->get();

        return response()->json($animais, 200);
    }
}
