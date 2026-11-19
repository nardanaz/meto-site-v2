import type { Metadata } from "next";
import Link from "next/link";
import LegalShell from "@/components/LegalShell";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description:
    "Términos y condiciones de uso de la aplicación MeTo. Reglas, derechos y obligaciones de usuarios y de Avalon Agency SRL.",
  alternates: { canonical: "/terms" },
};

const toc = [
  { id: "objeto", label: "Objeto del servicio" },
  { id: "aceptacion", label: "Aceptación y elegibilidad" },
  { id: "cuenta", label: "Tu cuenta" },
  { id: "uso", label: "Reglas de uso" },
  { id: "contenido", label: "Contenido del usuario" },
  { id: "prohibiciones", label: "Conductas prohibidas" },
  { id: "transacciones", label: "Transacciones entre usuarios" },
  { id: "moderacion", label: "Moderación y sanciones" },
  { id: "propiedad", label: "Propiedad intelectual" },
  { id: "disponibilidad", label: "Disponibilidad del servicio" },
  { id: "responsabilidad", label: "Limitación de responsabilidad" },
  { id: "indemnidad", label: "Indemnidad" },
  { id: "terminacion", label: "Terminación" },
  { id: "cambios", label: "Cambios en los términos" },
  { id: "ley", label: "Ley aplicable y jurisdicción" },
  { id: "contacto", label: "Contacto" },
];

export default function TermsPage() {
  return (
    <LegalShell
      eyebrow="Documento legal"
      title="Términos y condiciones"
      version="Versión 1.0 · Vigente desde 10 de noviembre de 2026"
      toc={toc}
    >
      <section id="objeto">
        <h2>1. Objeto del servicio</h2>
        <p>
          MeTo (Mercado Touch) es una aplicación móvil operada por{" "}
          <strong>Avalon Agency SRL</strong>, sociedad constituida bajo las
          leyes de la República Argentina, CUIT 30-71734263-8, con domicilio
          en Buenos Aires (en adelante, &ldquo;Avalon&rdquo;,
          &ldquo;nosotros&rdquo; o &ldquo;MeTo&rdquo;). MeTo pone a
          disposición de sus usuarios una plataforma para descubrir, mediante
          un sistema de match recíproco, productos ofrecidos por otras
          personas a cuadras a la redonda.
        </p>
        <p>
          MeTo actúa{" "}
          <strong>únicamente como intermediario tecnológico</strong>. No somos
          parte de las transacciones entre usuarios, no intervenimos en la
          fijación de precios, no garantizamos la calidad de los productos ni
          gestionamos pagos ni entregas (salvo que esto cambie expresamente
          en futuras versiones del servicio).
        </p>
      </section>

      <section id="aceptacion">
        <h2>2. Aceptación y elegibilidad</h2>
        <p>Al crear una cuenta en MeTo o al utilizar la aplicación, declarás que:</p>
        <ul>
          <li>
            Sos una persona humana <strong>mayor de 18 años</strong>.
          </li>
          <li>
            Tenés capacidad legal para obligarte conforme al Código Civil y
            Comercial de la República Argentina.
          </li>
          <li>
            Leíste, entendiste y aceptás estos Términos y Condiciones y la{" "}
            <Link href="/privacy">Política de privacidad</Link>.
          </li>
          <li>
            Los datos que nos proporcionás son verdaderos, exactos y
            actualizados.
          </li>
        </ul>
        <p>Si no aceptás alguno de estos términos, no podés usar MeTo.</p>
      </section>

      <section id="cuenta">
        <h2>3. Tu cuenta</h2>
        <p>
          Para usar MeTo necesitás crear una cuenta asociada a un correo
          electrónico válido. La autenticación se realiza mediante códigos de
          un solo uso enviados a tu email. Sos responsable de mantener el
          acceso a ese correo y de las actividades que se realicen desde tu
          cuenta.
        </p>
        <p>
          Si detectás un uso no autorizado de tu cuenta, avisanos de inmediato
          a <a href="mailto:hola@meto.com.ar">hola@meto.com.ar</a>.
        </p>
        <p>
          Podés dar de baja tu cuenta en cualquier momento desde Perfil →
          Eliminar cuenta dentro de la app.
        </p>
      </section>

      <section id="uso">
        <h2>4. Reglas de uso</h2>
        <p>Al usar MeTo te comprometés a:</p>
        <ul>
          <li>
            Publicar únicamente productos que te pertenezcan y que puedas
            enajenar legalmente.
          </li>
          <li>
            Describir con honestidad lo que ofrecés: estado, condiciones,
            defectos relevantes, precio.
          </li>
          <li>
            Comportarte con respeto hacia otros usuarios en los chats y al
            coordinar encuentros.
          </li>
          <li>
            Coordinar los retiros en lugares públicos o en condiciones
            seguras.
          </li>
          <li>
            Respetar los compromisos que asumas: si decís que vas a retirar un
            producto a una hora y lugar, avisá si no vas a poder.
          </li>
        </ul>
      </section>

      <section id="contenido">
        <h2>5. Contenido del usuario</h2>
        <p>
          Sos responsable de todo el contenido que subís a MeTo: fotos,
          descripciones de productos, mensajes de chat, reportes.
        </p>
        <p>
          Al publicar contenido, nos otorgás una{" "}
          <strong>
            licencia no exclusiva, gratuita, mundial y limitada
          </strong>{" "}
          para almacenarlo, mostrarlo a otros usuarios dentro de la app y
          mantenerlo disponible mientras tu publicación esté activa. Esta
          licencia termina cuando eliminás el contenido o tu cuenta.
        </p>
        <p>
          Seguís siendo el titular de los derechos sobre tu contenido. No lo
          usaremos para campañas publicitarias externas ni para entrenar
          modelos de inteligencia artificial de terceros.
        </p>
        <div className="legal-callout">
          <strong>Importante:</strong> no publiques fotos en las que aparezcan
          personas identificables sin su consentimiento. Las fotos deben ser
          del producto que vendés.
        </div>
      </section>

      <section id="prohibiciones">
        <h2>6. Conductas prohibidas</h2>
        <p>Está expresamente prohibido usar MeTo para:</p>
        <ul>
          <li>
            Publicar o intercambiar bienes cuyo comercio esté prohibido o
            restringido por la ley argentina: armas, explosivos,
            estupefacientes, especies protegidas, medicamentos sin
            prescripción, documentos oficiales, moneda, servicios sexuales,
            órganos, material que incite al odio o la discriminación,
            material que involucre menores de edad.
          </li>
          <li>
            Publicar productos falsificados, robados o que violen marcas
            registradas o derechos de autor de terceros.
          </li>
          <li>Acosar, amenazar, discriminar o difamar a otros usuarios.</li>
          <li>
            Enviar spam, ofertas comerciales masivas o mensajes automatizados.
          </li>
          <li>Suplantar la identidad de otra persona o entidad.</li>
          <li>
            Utilizar bots, scripts, scraping o cualquier medio automatizado
            para interactuar con el servicio sin autorización previa de
            Avalon.
          </li>
          <li>
            Intentar vulnerar la seguridad de la plataforma o acceder a datos
            de otros usuarios sin autorización.
          </li>
          <li>
            Pedir datos personales sensibles (DNI, datos bancarios,
            contraseñas) dentro del chat.
          </li>
          <li>Coordinar actos ilícitos.</li>
        </ul>
      </section>

      <section id="transacciones">
        <h2>7. Transacciones entre usuarios</h2>
        <p>
          En su versión actual, MeTo no procesa pagos ni organiza entregas.
          Las transacciones ocurren directamente entre comprador y vendedor,
          por fuera de la app, típicamente en persona.
        </p>
        <p>Esto significa que:</p>
        <ul>
          <li>
            Avalon <strong>no es parte</strong> de la operación de
            compraventa.
          </li>
          <li>No cobramos comisiones en esta etapa del servicio.</li>
          <li>
            No garantizamos que el producto sea como lo describe el vendedor,
            que esté en condiciones, ni que el encuentro ocurra.
          </li>
          <li>
            No mediamos reclamos entre partes salvo los que caigan dentro de
            nuestro sistema de moderación y afecten a nuestra plataforma.
          </li>
        </ul>
        <p>
          Si en una futura versión de MeTo habilitamos pagos u otras
          funcionalidades que impliquen que seamos parte de la transacción
          (por ejemplo, integración con Mercado Pago y comisión sobre el
          precio), publicaremos los nuevos términos aplicables y pediremos tu
          aceptación expresa.
        </p>
      </section>

      <section id="moderacion">
        <h2>8. Moderación y sanciones</h2>
        <p>
          MeTo cuenta con un sistema de moderación para preservar la seguridad
          y civilidad de la comunidad:
        </p>
        <ul>
          <li>Podés reportar a otro usuario o a una publicación desde la propia app.</li>
          <li>
            Podés bloquear a otro usuario: dejan de verse publicaciones y chat
            mutuamente.
          </li>
          <li>
            Podemos revisar reportes y, cuando corresponda, eliminar
            publicaciones, suspender temporalmente una cuenta o desactivarla
            definitivamente.
          </li>
          <li>
            En casos graves (por ejemplo, actividad ilegal, amenazas, abuso)
            podemos desactivar la cuenta sin aviso previo y colaborar con las
            autoridades competentes.
          </li>
        </ul>
      </section>

      <section id="propiedad">
        <h2>9. Propiedad intelectual</h2>
        <p>
          La marca &ldquo;MeTo&rdquo;, el isotipo, el nombre &ldquo;Mercado
          Touch&rdquo;, el diseño de la aplicación, el código fuente, el
          brandbook y toda la documentación asociada son propiedad de Avalon
          Agency SRL, están protegidos por la Ley 22.362 de Marcas y
          Designaciones, por la Ley 11.723 de Propiedad Intelectual de la
          República Argentina y por los tratados internacionales aplicables.
          Se encuentran registrados o en trámite de registro ante el Instituto
          Nacional de la Propiedad Industrial (INPI) y la Dirección Nacional
          del Derecho de Autor (DNDA).
        </p>
        <p>
          Al usar MeTo no adquirís ningún derecho sobre esta propiedad
          intelectual. Queda prohibido reproducir, modificar, descompilar o
          distribuir la aplicación o sus componentes sin autorización expresa
          y por escrito de Avalon.
        </p>
      </section>

      <section id="disponibilidad">
        <h2>10. Disponibilidad del servicio</h2>
        <p>
          Hacemos nuestro mejor esfuerzo para que MeTo esté disponible y
          funcione correctamente, pero no garantizamos un nivel específico de
          disponibilidad. El servicio puede estar interrumpido por
          mantenimiento, actualizaciones, incidentes técnicos o causas de
          fuerza mayor.
        </p>
        <p>
          Podemos modificar, suspender o discontinuar funcionalidades del
          servicio en cualquier momento, con aviso razonable cuando sea
          posible.
        </p>
      </section>

      <section id="responsabilidad">
        <h2>11. Limitación de responsabilidad</h2>
        <p>
          En la medida máxima permitida por la ley, Avalon no será responsable
          por:
        </p>
        <ul>
          <li>El contenido publicado por otros usuarios.</li>
          <li>
            Las conductas de otros usuarios dentro o fuera de la app
            (incluyendo los encuentros presenciales que coordinen entre sí).
          </li>
          <li>
            La calidad, autenticidad, legalidad o seguridad de los productos
            ofrecidos.
          </li>
          <li>
            Pérdidas o daños indirectos, lucro cesante o pérdida de
            oportunidad derivados del uso de MeTo.
          </li>
          <li>Interrupciones del servicio, errores o inexactitudes.</li>
        </ul>
        <p>
          Nada en estos términos limita responsabilidades que la ley no
          permita excluir, incluidos los derechos irrenunciables de las
          personas consumidoras bajo la Ley 24.240 de Defensa del Consumidor
          cuando corresponda.
        </p>
      </section>

      <section id="indemnidad">
        <h2>12. Indemnidad</h2>
        <p>
          Te comprometés a mantener indemne a Avalon, a sus socios, empleados
          y colaboradores, frente a cualquier reclamo de terceros derivado de
          tu uso del servicio en violación de estos términos, de la Política
          de privacidad o de la ley aplicable.
        </p>
      </section>

      <section id="terminacion">
        <h2>13. Terminación</h2>
        <p>
          Podés dar de baja tu cuenta cuando quieras desde la app. Podemos
          suspender o dar de baja tu cuenta si violás gravemente estos
          términos, con notificación cuando sea posible. Al terminar la
          relación, se aplicarán los plazos de retención descritos en la{" "}
          <Link href="/privacy#retencion">Política de privacidad</Link>.
        </p>
      </section>

      <section id="cambios">
        <h2>14. Cambios en los términos</h2>
        <p>
          Podemos actualizar estos términos. Si los cambios son sustanciales,
          te avisaremos por email y desde dentro de la app con razonable
          antelación. La versión vigente estará siempre publicada en{" "}
          <Link href="/terms">meto.com.ar/terms</Link> con la fecha de entrada
          en vigor. Si seguís usando MeTo después de la fecha indicada, se
          entenderá que aceptás los nuevos términos.
        </p>
      </section>

      <section id="ley">
        <h2>15. Ley aplicable y jurisdicción</h2>
        <p>
          Estos términos se rigen por las leyes de la República Argentina.
          Para cualquier controversia derivada de su interpretación o
          ejecución, las partes se someten a la jurisdicción de los tribunales
          ordinarios de la Ciudad Autónoma de Buenos Aires, con renuncia a
          cualquier otro fuero o jurisdicción que pudiera corresponder, sin
          perjuicio de los derechos irrenunciables de las personas
          consumidoras.
        </p>
      </section>

      <section id="contacto">
        <h2>16. Contacto</h2>
        <p>Para cualquier consulta sobre estos términos:</p>
        <ul>
          <li>
            <strong>Email:</strong>{" "}
            <a href="mailto:hola@meto.com.ar">hola@meto.com.ar</a>
          </li>
          <li>
            <strong>Responsable:</strong> Avalon Agency SRL (CUIT
            30-71734263-8)
          </li>
          <li>
            <strong>Domicilio:</strong> Ciudad Autónoma de Buenos Aires,
            Argentina
          </li>
        </ul>
      </section>
    </LegalShell>
  );
}
