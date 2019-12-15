@extends('layouts.app')

@section('content')
<div class="col-sm-offset-3 col-sm-6">
    <div class="panel-title">
        <h1>Clientes</h1>
    </div>
    <!-- Bootstrap Boilerplate... -->

    <div class="panel-body">
        <!-- Display Validation Errors -->
        @include('common.errors')

        <!-- New Task Form -->
        <form action="{{ url('clientes') }}" method="POST" class="form-horizontal">
            {{ csrf_field() }}

            <!-- Task Name -->
            <div class="form-group">
                <label for="task" class="col-sm-3 control-label">Nombre</label>

                <div class="col-sm-6">
                    <input type="text" name="name" id="task-name" class="form-control">
                </div>
            </div>

            <div class="form-group">
                <label for="ruc" class="col-sm-3 control-label">DNI</label>

                <div class="col-sm-6">
                    <input type="text" name="ruc" id="task-name" class="form-control">
                </div>
            </div>

            <div class="form-group">
                <label for="address" class="col-sm-3 control-label">Dirección</label>

                <div class="col-sm-6">
                    <input type="text" name="address" id="task-name" class="form-control">
                </div>
            </div>

            <div class="form-group">
                <label for="phone" class="col-sm-3 control-label">Teléfono</label>

                <div class="col-sm-6">
                    <input type="text" name="phone" id="task-name" class="form-control">
                </div>
            </div>

            <div class="form-group">
                <label for="email" class="col-sm-3 control-label">E-mail</label>

                <div class="col-sm-6">
                    <input type="text" name="email" id="task-name" class="form-control">
                </div>
            </div>

            <!-- Add Task Button -->
            <div class="form-group">
                <div class="col-sm-offset-3 col-sm-6">
                    <button type="submit" class="btn btn-default">
                        <i class="fa fa-plus"></i> Registrar usuario
                    </button>
                </div>
            </div>
        </form>
    </div>
</div>    

<div class="col-md-12">
<!--mostrar usuarios-->
@if (count($clientes) > 0)
    <div class="panel panel-default">
        <div class="panel-heading">
        Lista de usuarios
        </div>

        <div class="panel-body">
            <table class="table table-striped task-table">
                <thead>
                    <th>Usuario</th>
                    <th>DNI</th>
                    <th>Dirección</th>
                    <th>Teléfono</th>
                    <th>E-mail</th>
                    <th>Acción</th>
                </thead>
                <tbody>
                @foreach ($clientes as $cliente)
                    <tr>
                        <td class="table-text"><div>{{ $cliente->name }}</div></td>
                        <td class="table-text"><div>{{ $cliente->ruc }}</div></td>
                        <td class="table-text"><div>{{ $cliente->address }}</div></td>
                        <td class="table-text"><div>{{ $cliente->phone }}</div></td>
                        <td class="table-text"><div>{{ $cliente->email }}</div></td>

                        <td>

                                <button type="submit" class="btn btn-success" onclick="location.href='clientes/{{ $cliente->id }}'">
                                    <i class="fa fa-pencil"></i>Editar
                                </button>
                            </form>

                            <form action="{{ url('cliente') }}/{{ $cliente->id }}" method="POST">
                                {{ csrf_field() }}
                                {{ method_field('DELETE') }}

                                <button type="submit" class="btn btn-danger">
                                    <i class="fa fa-trash"></i>Eliminar
                                </button>
                            </form>
                        </td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>

    </div>
    @endif

</div>

    <!-- TODO: Current Tasks -->
@endsection