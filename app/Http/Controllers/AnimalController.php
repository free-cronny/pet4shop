<?php

namespace App\Http\Controllers;

use App\Models\Animais;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AnimalController extends Controller
{
    // cadastrar um animal
    public function store(Request $request)
    {

        $request->validate([
            'nome' => 'required|string|max:100',
            'email' => 'required|email|max:100',
            'cpf' => 'required|string|max:11',
            'telefone' => 'required|string|max:11',
            'nome_animal' => 'required|string|max:100',
            'raca_animal' => 'required|string|max:100',
            'servico' => 'required|string|max:100',
        ]);
        
        $animal = new Animais();
        $animal->nome = $request->nome;
        $animal->email = $request->email;
        $animal->cpf = $request->cpf;
        $animal->telefone = $request->telefone;
        $animal->nome_animal = $request->nome_animal;
        $animal->raca_animal = $request->raca_animal;
        $animal->servico = $request->servico;
        $animal->user_id = auth()->user()->id;
        $animal->save();
        return response()->json($animal);
    }

    // listar todos os animais do usuário logado
    public function listarAnimaisDoUsuarioLogado()
    {
        // se o role do usuario for admin, ele pode ver todos os animais se não apenas os dele
        if (auth()->user()->role == 'admin') {
            $animais = Animais::all();
        } else {
            $animais = Animais::where('user_id', auth()->user()->id)->get();
        }
        return response()->json($animais, 200);
    }

}
