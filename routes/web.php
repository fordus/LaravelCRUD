<?php
use Illuminate\Http\Request;
use App\Client;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

//Mostrar todos los clientes
Route::get('/clientes', function () {
    $clientes = Client::all();
    return view('clientes', [ 'clientes' => $clientes]);
});

//Mostrar edicion cliente
Route::get('/clientes/{id}', function ($id) {
    $cliente = Client::findOrFail($id);
    return view('cliente-editar', [ 'cliente' => $cliente]);
});


//Agregar un cliente
Route::post('/clientes', function (Request $request) {

    $validator = Validator::make($request->all(), [
        'name' => 'required|max:255',
        'ruc' => 'required|digits:6',
        'address' => 'required|max:255',
        'phone' => 'min:6',
        'email' => 'email',
    ]);
    if ($validator->fails()) {
        return redirect('/clientes')
            ->withInput()
            ->withErrors($validator);
    }
    $client = new Client;
    $client->name = $request->name;
    $client->ruc = $request->ruc;
    $client->address = $request->address;
    $client->phone = $request->phone;
    $client->email = $request->email;
    $client->save();
    return redirect('/clientes');

});

//Editar un cliente
Route::put('/cliente/{id}', function (Request $request, $id) {

    $validator = Validator::make($request->all(), [
        'name' => 'required|max:255',
        'ruc' => 'required|digits:6',
        'address' => 'required|max:255',
        'phone' => 'min:6',
        'email' => 'email',
    ]);
    if ($validator->fails()) {
        return redirect('/clientes')
            ->withInput()
            ->withErrors($validator);
    }

    $cliente = Client::findOrFail($id);
    $client->name = $request->name;
    $client->ruc = $request->ruc;
    $client->address = $request->address;
    $client->phone = $request->phone;
    $client->email = $request->email;
    $client->save();

    return redirect('/clientes');
});


//Eliminar un cliente
Route::delete('/cliente/{id}', function ($id) {
    Client::findOrFail($id)->delete();

    return redirect('/clientes');
});

