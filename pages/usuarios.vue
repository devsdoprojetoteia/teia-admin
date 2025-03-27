<template>
  <div>
    <v-container v-if="users">
      <Button
        color="success"
        @click="showAddUser = true"
        block
        class="mb-8 mt-4"
      >
        <Icon start icon="mdi-plus" /> Adicionar conta
      </Button>
      <v-row
        no-gutters
        class="mx-n1 mb-4"
        v-if="auth.user.value?.role === 'administrador'"
      >
        <v-col cols="3" class="px-1">
          <Button
            :color="!filterRole ? 'success' : ''"
            block
            class="text-caption"
            style="padding: 24px 8px; font-size: 10px"
            @click="filterRole = ''"
            size="x-small"
          >
            Todos
          </Button>
        </v-col>
        <v-col
          v-for="role in User.roles"
          :key="role.value"
          cols="3"
          class="px-1"
        >
          <Button
            block
            :color="filterRole === role.value ? 'success' : ''"
            class="text-caption"
            style="padding: 24px 8px; font-size: 10px"
            @click="filterRole = role.value"
            size="x-small"
          >
            {{ role.title }}
          </Button>
        </v-col>
      </v-row>
      <div>
        <v-card>
          <div v-if="filteredUsers">
            <div v-if="!hasUsers">
              <Alert message="Nenhuma conta aqui" />
            </div>
            <v-list>
              <template v-for="(user, userIndex) in filteredUsers">
                <v-list-item @click="openUser(user)">
                  <div class="d-flex justify-space-between align-center py-1">
                    <div>
                      <Text>{{ user.name }}</Text>
                      <br />
                      <Text emphasis="medium" variant="small">
                        {{ user.phone }}
                      </Text>
                    </div>

                    <Chip
                      v-if="user.role"
                      outlined
                      size="small"
                      class="text--secondary ml-3"
                    >
                      {{ user.roleLabel }}
                    </Chip>
                  </div>
                </v-list-item>
                <v-divider v-if="userIndex < filteredUsers.length - 1" />
              </template>
            </v-list>
          </div>
          <Loading v-else />
        </v-card>
      </div>
      <UserForm
        v-if="showAddUser"
        @created="userCreated"
        @updated="userUpdated"
        @close="showAddUser = false"
      />
      <UserInfo
        v-if="activeUser"
        :user="activeUser"
        @updated="userUpdated"
        @close="closeUser"
      />
      {{ activeUser }}
    </v-container>
  </div>
</template>
<script lang="ts" setup>
import User from "~~/models/user";

definePageMeta({
  middleware: ["authenticated"],
  layout: "authenticated",
});

useHead({
  title: "Usuários",
});

const filteredUsers = computed(() => {
  if (filterRole.value) {
    return users.value?.filter((user) => user.role === filterRole.value);
  }
  return users.value;
});

const auth = useAuth();
const {
  users,
  loadUsers,
  showAddUser,
  hasUsers,
  openUser,
  closeUser,
  activeUser,
} = useUsers();

const filterRole = ref("");

// load users on mounted
onMounted(async () => {
  await loadUsers();
});

const userCreated = async (user: User) => {
  await loadUsers();
};

const userUpdated = async (user: User) => {
  await loadUsers();
};
</script>
