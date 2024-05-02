<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    protected $table = 'usuarios';
    protected $fillable = ['nome', 'email', 'cpf', 'telefone', 'animal', 'nome_animal', 'raca_animal', 'servico'];
}