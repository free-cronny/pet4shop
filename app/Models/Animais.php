<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Animais extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'email',
        'data',
        'cpf',
        'telefone',
        'nome_animal',
        'raca_animal',
        'servico',
        'user_id'
    ];

    /**
     * Get the user that owns the animal.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
