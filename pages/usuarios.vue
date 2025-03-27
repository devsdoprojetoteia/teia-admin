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
      <v-row no-gutters class="mx-n1">
        <v-col
          v-for="role in User.roles"
          :key="role.value"
          cols="4"
          class="px-1"
        >
          <Button
            block
            :color="showStatus.value === role.value ? 'primary' : ''"
            class="text-caption"
            style="padding: 24px 8px"
            @click="showStatus = role"
          >
            {{ role.title }}
          </Button>
        </v-col>
      </v-row>
      <div class="pt-4">
        <v-card>
          <div v-if="users">
            <div v-if="!hasUsers">
              <Alert message="Nenhuma conta aqui" />
            </div>
            <v-list>
              <template v-for="user in users">
                <v-list-item
                  v-if="user.role === showStatus.value"
                  @click="openUser(user)"
                >
                  <Text>{{ user.name }}</Text>
                  <div>
                    <div class="d-flex justify-space-between align-start">
                      <div>
                        <Chip
                          v-if="user.role"
                          outlined
                          size="small"
                          class="text--secondary"
                        >
                          {{ user.roleLabel }}
                        </Chip>
                      </div>
                    </div>
                  </div>
                </v-list-item>
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

const {
  users,
  loadUsers,
  showAddUser,
  hasUsers,
  openUser,
  closeUser,
  activeUser,
} = useUsers();

const showStatus = ref(User.roles[0]);

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
