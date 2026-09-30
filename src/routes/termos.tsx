import { createFileRoute, Link } from "@tanstack/react-router";
import logoAsset from "@/assets/mosantt-logo.png.asset.json";

export const Route = createFileRoute("/termos")({
  component: Termos,
});

function Termos() {
  return (
    <div className="min-h-screen bg-sand text-charcoal selection:bg-oak/30">
      <header className="border-b border-charcoal/10 px-5 py-6 md:px-10 md:py-8">
        <Link to="/" className="block">
          <img src={logoAsset.url} alt="Mosantt" className="h-8 md:h-10 w-auto opacity-90 transition-opacity hover:opacity-100" />
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-5 py-16 md:py-24">
        <h1 className="font-serif text-4xl md:text-5xl mb-8">Termos de Uso</h1>
        <div className="space-y-6 text-sm md:text-base font-light text-charcoal/80 leading-relaxed">
          <p>
            Estes Termos de Uso regem o acesso e uso do site da <strong>Mosantt Saúde e Estética</strong> (Razão Social: J M M & A M RABELO LTDA, CNPJ: 46.748.316/0001-67), doravante denominada "Mosantt", "Galeria", ou simplesmente "nós".
          </p>

          <h2 className="font-serif text-xl md:text-2xl mt-8 mb-4 text-charcoal">1. Aceitação dos Termos</h2>
          <p>
            Ao acessar e utilizar este site, você concorda expressamente com os presentes Termos de Uso. Caso não concorde com qualquer condição estabelecida, recomendamos que não utilize o site.
          </p>

          <h2 className="font-serif text-xl md:text-2xl mt-8 mb-4 text-charcoal">2. Finalidade do Site</h2>
          <p>
            Este site tem caráter estritamente informativo, com o objetivo de apresentar a estrutura da Galeria Mosantt, as salas disponíveis e os profissionais que aqui atuam. O site não realiza vendas diretas, coletas de pagamento ou agendamentos automatizados nativos. Todos os agendamentos ou contatos comerciais são redirecionados para canais externos (como WhatsApp, Instagram ou sites dos próprios profissionais).
          </p>

          <h2 className="font-serif text-xl md:text-2xl mt-8 mb-4 text-charcoal">3. Responsabilidade sobre Serviços de Terceiros</h2>
          <p>
            A Mosantt atua como uma galeria de clínicas e consultórios independentes. Cada profissional ou clínica listada em nosso site é inteiramente responsável pelos serviços de saúde, estética ou odontologia que prestam, bem como por suas próprias políticas, licenças e protocolos de atendimento. A Mosantt não se responsabiliza por eventuais danos ou insatisfações decorrentes dos serviços prestados por terceiros no interior da galeria.
          </p>

          <h2 className="font-serif text-xl md:text-2xl mt-8 mb-4 text-charcoal">4. Propriedade Intelectual</h2>
          <p>
            Todo o conteúdo presente neste site (textos, imagens, logotipo, vídeos, design e código-fonte) é de propriedade exclusiva da Mosantt ou está devidamente licenciado para uso. É expressamente proibida a reprodução, distribuição ou modificação de qualquer material sem autorização prévia por escrito.
          </p>

          <h2 className="font-serif text-xl md:text-2xl mt-8 mb-4 text-charcoal">5. Modificações dos Termos</h2>
          <p>
            A Mosantt reserva-se o direito de atualizar ou modificar estes Termos de Uso a qualquer momento, sem aviso prévio. Recomendamos que os usuários consultem esta página periodicamente.
          </p>

          <h2 className="font-serif text-xl md:text-2xl mt-8 mb-4 text-charcoal">6. Foro e Legislação</h2>
          <p>
            Estes Termos são regidos pela legislação da República Federativa do Brasil. Para dirimir quaisquer controvérsias, fica eleito o foro da comarca de Rio Branco - AC, renunciando a qualquer outro, por mais privilegiado que seja.
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
