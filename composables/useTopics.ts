import Topic from "~~/models/topic";
import type { FormValues } from "~~/models/dynamic-form";

const useTopics = () => {
  const { $api } = useNuxtApp();
  const route = useRoute();
  const router = useRouter();

  let topics = useState<Topic[] | null>("topics");
  let showAddTopic = useState<Boolean>("showAddTopic", () => false);
  let activeTopic = useState<Topic | null>("activeTopic", () => null);

  const loadTopics = async (moduleId: string) => {
    topics.value = await $api.topics.list(moduleId);
  };

  const hasTopics = computed(() => {
    return topics.value !== null && topics.value.length > 0;
  });

  const editTopic = (topic: Topic) => {
    activeTopic.value = topic;
  };

  const createTopic = async (data: FormValues) => {
    return await $api.topics.create(data);
  };

  const updateTopic = async (id: string, data: FormValues) => {
    return await $api.topics.update(id, data);
  };

  const deleteTopic = async (id: string) => {
    return await $api.topics.delete(id);
  };

  const closeTopic = () => {
    router.push({
      path: route.path,
      query: {
        ...route.query,
        topic: undefined,
      },
    });
  };

  return {
    topics,
    activeTopic,
    showAddTopic,
    hasTopics,
    loadTopics,
    editTopic,
    closeTopic,
    createTopic,
    updateTopic,
    deleteTopic,
  };
};

export default useTopics; 