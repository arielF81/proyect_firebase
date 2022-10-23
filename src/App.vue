<script>
import { logout, subscribeToAuthChanges} from "./services/auth.js";

export default {
    name: "App",
    data: () => ({
        user: {
            id: null,
            email: null,
        }
    }),
    methods: {
        handleLogout() {
            logout();
        }
    },
    mounted() {
        subscribeToAuthChanges(newUserData => this.user = newUserData);
    }
};
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">God Nordic</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Abrir/cerrar menú de navegación">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbar">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">Home</router-link>
                       
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/descargas">Descargas</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/chat">Chat</router-link>
                    </li>
                    <template v-if="user.id === null">
                        <li class="nav-item">
                        <router-link class="nav-link" to="/iniciar-sesion">Iniciar Sesión</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/registro">Crear Cuenta</router-link>
                    </li>

                </template>
                <template v-else>
                    
                    
                    <li class="nav-item">
                        <router-link class="nav-link" to="/perfil">Perfil</router-link>
                    </li>
                    <li class="nav-item">
                            <form action="#" method="post" @submit.prevent="handleLogout">
                                <button class="btn nav-link bg-info text-dark">Cerrar Sesión</button>
                            </form>
                        </li>
                </template>
                </ul>
            </div>
        </div>
    </nav>
    <main class="container py-3">
        <router-view />
    </main>
    <footer class="footer">
        <p class="mb-0">Da Vinci &copy; 2022</p>
    </footer>
</template>
