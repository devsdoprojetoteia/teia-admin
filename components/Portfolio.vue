<template>
  <section id="portfolio" class="py-16 alternative-bg">
    <v-container>
      <Text variant="h2">Portfólio</Text>
      <Text variant="h5">
        Desenvolvemos produtos próprios, projetos para clientes e em parcerias
        com outras empresas e agências.
      </Text>
      <p>
        Nossos aplicativos já ajudaram inúmeros clientes a impulsionar o
        crescimento de suas empresas. Desde aplicativos de gerenciamento de
        equipe até soluções de e-commerce, temos a habilidade e experiência para
        criar aplicativos personalizados que atendam às necessidades específicas
        de cada cliente.
      </p>
      <p>
        Não importa qual seja o seu setor de atuação, nós podemos ajudá-lo a
        alcançar seus objetivos através da tecnologia. Confira alguns dos nossos
        projetos recentes para ver como nossos aplicativos podem ajudar a sua
        empresa a prosperar.
      </p>
      <div>
        <v-row
          v-for="project in projects"
          :href="project.link"
          target="_blank"
          class="my-4 d-flex justify-start align-center"
        >
          <v-col cols="12" lg="3">
            <img :src="project.image" style="max-width: 200px" />
          </v-col>
          <v-col cols="12" lg="9">
            <Text variant="h6">
              {{ project.title }}
            </Text>
            <p>
              {{ project.description }}
            </p>
            <div>
              <Chip
                v-for="(tag, index) in project.tags"
                :key="index"
                :href="tag.link"
                target="_blank"
              >
                {{ tag.text }}
              </Chip>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </section>
</template>

<script setup lang="ts">
interface Provider {
  title: string;
  description: string;
  link: string;
  image: string;
  tags: { text: string; link?: string }[];
}
const projects: Provider[] = [
  {
    title: "Cultivar Brasil",
    description:
      "Aplicativo desenvolvido com o objetivo de facilitar o aprendizado sobre cultivo do próprio alimento.",
    link: "https://www.cultivarbrasil.com",
    image: "/img/projetos/cultivar.png",
    tags: [{ text: "Produto próprio" }],
  },
  {
    title: "Cronograma Personalizado",
    description:
      "Desenvolvemos em parceria com PriJorge um aplicativo de gerenciamento de cronograma personalizado de cuidados com os cabelos com consultorias e conteúdos exclusivos.",
    link: "https://app.prijorge.com",
    image: "/img/projetos/prijorge.png",
    tags: [
      { text: "Em parceria com PriJorge", link: "https://www.prijorge.com" },
    ],
  },
  {
    title: "Redário",
    description:
      "Sistema de gerenciamento do processo de coleta, processamento, armazenamento, planejamento de plantio e venda de sementes para recuperação de áreas degradadas.",
    link: "https://redario.org.br/",
    image: "/img/projetos/redario.png",
    tags: [
      { text: "Em parceria com Terrakrya", link: "https://www.terrakrya.com" },
    ],
  },
  {
    title: "Biobá",
    description:
      "Plataforma concebida como uma estratégia multissetorial para criar conexões entre a produção agroecológica e extrativista (sociobiodiversidade), gerada a partir dos agricultores familiares e comunidades tradicionais e povos indígenas com os mercados consumidores, dentro de uma lógica norteada por princípios básicos de sustentabilidade, agroecologia, transparência, participação e controle social e economia solidária.",
    link: "https://www.bioba.com.br",
    image: "/img/projetos/bioba.png",
    tags: [
      { text: "Em parceria com Terrakrya", link: "https://www.terrakrya.com" },
    ],
  },
  {
    title: "Caminhos da Semente",
    description:
      "Rede de pessoas e organizações com objetivo de dar escala à restauração ecológica no Brasil com foco no método de semeadura direta.",
    link: "https://www.caminhosdasemente.org.br/",
    image: "/img/projetos/caminhos-da-semente.png",
    tags: [
      { text: "Em parceria com Terrakrya", link: "https://www.terrakrya.com" },
    ],
  },
  {
    title: "Associação Floresta Protegida (AFP)",
    description:
      "Organização indígena do Povo Mẽbêngôkre - Kayapó que representa aproximadamente 3 mil indígenas de 31 aldeia situadas nas Terras Indígenas Kayapó, Mekragnoti e Las Casas, no sul do estado do Pará. A AFP surgiu em 1998 e atua através do desenvolvimento e execução de projetos estratégicos, em 4 linhas ação: Cultura e Conhecimento, Atividades Produtivas e Geração de Renda, Monitoramento Ambiental e Territorial e Fortalecimento institucional e político.",
    link: "https://www.florestaprotegida.org.br/",
    image: "/img/projetos/floresta-protegida.png",
    tags: [
      { text: "Em parceria com Terrakrya", link: "https://www.terrakrya.com" },
    ],
  },
  {
    title: "Xingu+",
    description:
      "Rede formada pelas aldeias e comunidades que fazem parte do Corredor Xingu, patrimônio cultural, linguístico e ecológico.",
    link: "https://www.xingumais.org.br/",
    image: "/img/projetos/xingu+.png",
    tags: [
      { text: "Em parceria com Terrakrya", link: "https://www.terrakrya.com" },
    ],
  },
];
</script>
