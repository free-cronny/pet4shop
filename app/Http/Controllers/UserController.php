<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }



    // atualizar cargo do usuario

    public function updatePrivilege(Request $request, $id)
    {
        $user = User::find($id);
        $user->role = $request->privilege; // Usando 'privilege' em vez de 'role'
        $user->save();

        return inertia('dashboard', [
            'teste' => ['usuarios' => User::all()]
        ]);
    }
}
