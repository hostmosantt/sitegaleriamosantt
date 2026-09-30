import { createFileRoute, Link } from "@tanstack/react-router";
import logoAsset from "@/assets/mosantt-logo.png.asset.json";

export const Route = createFileRoute("/privacidade")({
  component: Privacidade,
});

function Privacidade() {
  return (
    <div className="min-h-screen bg-sand text-charcoal selection:bg-oak/30">
      <header className="border-b border-charcoal/10 px-5 py-6 md:px-10 md:py-8">
        <Link to="/" className="block">
          <img src={logoAsset.url} alt="Mosantt" className="h-8 md:h-10 w-auto opacity-90 transition-opacity hover:opacity-100" />
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-5 py-16 md:py-24">
        <h1 className="font-serif text-4xl md:text-5xl mb-8">Política de Privacidade</h1>
        <div className="space-y-6 text-sm md:text-base font-light text-charcoal/80 leading-relaxed">
          <p>
            A <strong>Mosantt Saúde e Estética</strong> (Razão Social: J M M & A M RABELO LTDA, CNPJ: 46.748.316/0001-67), localizada na Estr. Dias Martins, 1303 - Jardim de Alah, Rio Branco - AC, compromete-se a proteger a privacidade e os dados pessoais dos usuários de seu site. Esta Política de Privacidade descreve como tratamos as informações que você nos confia, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
          </p>

          <h2 className="font-serif text-xl md:text-2xl mt-8 mb-4 text-charcoal">1. Coleta de Dados</h2>
          <p>
            <strong>Nosso site tem caráter exclusivamente informativo.</strong> Nós não possuímos formulários de cadastro, sistemas de login, ou captação ativa de dados de saúde no ambiente do site.
          </p>
          <p>
            Quando você interage com o site, podemos coletar apenas dados de navegação anonimizados (cookies básicos de desempenho ou analytics) para entender como o site é utilizado e melhorar a experiência do usuário. 
            Quaisquer contatos, agendamentos ou envios de informações pessoais são realizados ao clicar nos links que redirecionam o usuário para o aplicativo WhatsApp ou para os sites e redes sociais dos profissionais autônomos.
          </p>

          <h2 className="font-serif text-xl md:text-2xl mt-8 mb-4 text-charcoal">2. Uso das Informações</h2>
          <p>
            Como não coletamos dados pessoais através de formulários, o uso de informações restringe-se a estatísticas gerais de visitação do site. Caso você entre em contato conosco através do nosso WhatsApp oficial (68 99230-2967), seus dados de contato serão utilizados única e exclusivamente para responder às suas dúvidas, agendar visitas ou prestar o atendimento comercial solicitado.
          </p>

          <h2 className="font-serif text-xl md:text-2xl mt-8 mb-4 text-charcoal">3. Compartilhamento de Dados</h2>
          <p>
            A Mosantt não vende, aluga ou compartilha seus dados pessoais com terceiros para fins de marketing. Informações fornecidas via WhatsApp poderão ser acessadas apenas pela equipe de recepção ou administração da galeria. Vale ressaltar que, ao contatar diretamente um dos profissionais que atuam na galeria, o tratamento dos seus dados de saúde será de responsabilidade exclusiva desse profissional ou clínica.
          </p>

          <h2 className="font-serif text-xl md:text-2xl mt-8 mb-4 text-charcoal">4. Seus Direitos</h2>
          <p>
            De acordo com a LGPD, você tem o direito de solicitar o acesso, correção, atualização ou exclusão dos seus dados pessoais mantidos por nós (por exemplo, no histórico do WhatsApp da nossa recepção). Para exercer qualquer um desses direitos, entre em contato conosco pelos canais oficiais informados abaixo.
          </p>

          <h2 className="font-serif text-xl md:text-2xl mt-8 mb-4 text-charcoal">5. Links para Terceiros</h2>
          <p>
            Nosso site contém links para redes sociais (Instagram) e para os sites dos profissionais que ocupam as salas. Não somos responsáveis pelas práticas de privacidade de sites de terceiros. Recomendamos a leitura das políticas de privacidade dessas plataformas.
          </p>

          <h2 className="font-serif text-xl md:text-2xl mt-8 mb-4 text-charcoal">6. Contato</h2>
          <p>
            Em caso de dúvidas sobre esta Política de Privacidade ou sobre como tratamos seus dados, entre em contato através do telefone/WhatsApp: <strong>(68) 99230-2967</strong>.
          </p>
        </div>

        <div className="mt-16 pt-8 border-t border-charcoal/10">
          <Link to="/" className="text-[10px] uppercase tracking-[0.2em] font-medium text-charcoal/60 hover:text-charcoal transition-colors">
            ← Voltar para a página inicial
          </Link>
        </div>
      </main>
    </div>
  );
}
