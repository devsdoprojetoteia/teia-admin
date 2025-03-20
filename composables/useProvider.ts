import Provider from "../models/provider";
const useProvider = () => {
  let provider = useState<Provider>("provider", () => {
    return {
      slug: "",
      name: "",
      description: "",
    };
  });

  const setProvider = (p: Provider) => {
    provider.value = p;
  };

  return {
    provider,
    setProvider,
  };
};
export default useProvider;
