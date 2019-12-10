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
                        <i class="fa fa-plus"></i> Registrar cliente
                    </button>
                </div>
            </div>
        </form>
    </div>

    <!-- TODO: Current Tasks -->
@endsection