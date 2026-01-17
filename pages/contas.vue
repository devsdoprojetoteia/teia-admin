<template>
  <div>
    <v-container v-if="users">
      <div class="d-flex justify-space-between align-center">
        <h1 class="text-h4 font-weight-bold mb-0">Contas</h1>
        <Button color="primary" @click="showAddUser = true" size="large" class="mb-8 mt-4" icon>
          <Icon icon="mdi-plus" />
        </Button>
      </div>
      <v-row no-gutters class="mx-n1 mb-4" v-if="auth.user.value?.role === 'administrador'">
        <v-col cols="3" class="px-1">
          <Button :color="!filterRole ? 'primary' : ''" block class="text-caption"
            style="padding: 24px 8px; font-size: 10px" @click="filterRole = ''" size="x-small">
            Todos
          </Button>
        </v-col>
        <v-col v-for="role in User.roles" :key="role.value" cols="3" class="px-1">
          <Button block :color="filterRole === role.value ? 'primary' : ''" class="text-caption"
            style="padding: 24px 8px; font-size: 10px" @click="filterRole = role.value" size="x-small">
            {{ role.title }}
          </Button>
        </v-col>
      </v-row>
      <DynamicInput name="search" :props="{
        label: 'Buscar',
      }" v-model="search" label="Buscar" clearable block class="mb-4" :validate="false" />
      <div>
        <v-card>
          <div v-if="filteredUsers">
            <div v-if="filteredUsers.length === 0" class="pa-4 text-center">
              <Alert> Nenhuma conta encontrada </Alert>
            </div>
            <v-list v-else>
              <template v-for="(user, userIndex) in filteredUsers">
                <v-list-item>
                  <div class="d-flex justify-space-between align-center py-1">
                    <div @click="openUser(user)" class="cursor-pointer">
                      <Text>{{ user.name }}</Text>
                      <br />
                      <Text emphasis="medium" variant="small">
                        {{ user.phone }}
                      </Text>
                    </div>
                    <div class="d-flex align-center">
                      <Chip v-if="user.role" size="small" :color="user.roleColor" @click="openUser(user)"
                        class="cursor-pointer">
                        {{ user.roleLabel }}
                      </Chip>
                      <Button color="primary" :to="'/relatorios?userId=' + user?.id" size="x-small" class="ml-2" icon
                        v-if="user.role === 'estudante'">
                        <Icon icon="mdi-chart-box-outline" />
                      </Button>
                    </div>
                  </div>
                </v-list-item>
                <v-divider v-if="userIndex < filteredUsers.length - 1" />
              </template>
            </v-list>
          </div>
          <Loading v-else />
        </v-card>
      </div>
      <UserForm v-if="showAddUser" @created="userCreated" @updated="userUpdated" @close="showAddUser = false"
        :user="activeUser" />
      <UserInfo v-if="activeUser" :user="activeUser" @updated="userUpdated" @close="closeUser"
        @edit="showAddUser = true" @remove="removeUser" @changePassword="showChangePassword = true" />
      <ChangePasswordForm v-if="activeUser && showChangePassword" @updated="userUpdated"
        @close="showChangePassword = false" :user="activeUser" />
    </v-container>
  </div>
</template>
<script lang="ts" setup>
import slugify from "slugify";
import User from "~~/models/user";

definePageMeta({
  middleware: ["authenticated"],
  layout: "authenticated",
});

useHead({
  title: "Contas",
});

const filteredUsers = computed(() => {
  let list = users.value ?? [];
  if (filterRole.value) {
    list = list.filter((user) => user.role === filterRole.value);
  }

  if (search.value) {
    list = list.filter((user) =>
      slugify(user.name + ' ' + user.phone + ' ' + user.phone.replace(/[^0-9]/g, ''), { lower: true }).includes(
        slugify(search.value, { lower: true })
      )
    );
  }
  return list.sort((a, b) => a.role.localeCompare(b.role));
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
  deleteUser,
} = useUsers();

const filterRole = ref("");
const search = ref("");
const showChangePassword = ref(false);

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

const removeUser = async () => {
  if (activeUser.value) {
    await deleteUser(activeUser.value!.id!);
    closeUser();
    await loadUsers();
    const { notifySuccess } = useNotify();
    notifySuccess("Conta removida com sucesso");
  }
};
</script>
