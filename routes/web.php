<?php

use App\Http\Controllers\AnimalController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ServiceController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UsuarioController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});



Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::post('/usuarios', [UsuarioController::class, 'store']);

    // get all services
    Route::get('/services', [ServiceController::class, 'getAllServices']);

    // ROTAS HTTP
    Route::get('/usuarios', [UsuarioController::class, 'index'])->name('users.index');
    Route::post('/usuarios', [UsuarioController::class, 'store']);
    Route::delete('/usuarios/{id}', [UsuarioController::class, 'delete']);

    // cadastrar um animal
    Route::get('/listarAnimaisDoUsuarioLogado', [AnimalController::class, 'listarAnimaisDoUsuarioLogado']);
    Route::post('/criarAnimais', [AnimalController::class, 'store']);

});

require __DIR__.'/auth.php';

