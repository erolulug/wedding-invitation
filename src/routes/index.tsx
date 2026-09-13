import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { Button } from "../design-system/components/Button";
import { EnvelopeIntro } from "../design-system/components/EnvelopeIntro";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jana & Ahmet | Wedding Invitation" },
      { name: "description", content: "Jana and Ahmet invite you to celebrate their wedding on 20 June 2027." },
      { property: "og:title", content: "Jana & Ahmet | Wedding Invitation" },
      { property: "og:description", content: "Join us for our wedding celebration on 20 June 2027." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: InvitationPage,
});

const weddingTime = new Date("2027-06-20T15:00:00").getTime();

const copy = {
  cs: {
    prompt: "Klepnutím na pečeť otevřete", tagline: "Dva příběhy, jedna cesta", welcome: "S radostí Vás zveme na náš svatební den",
    countdown: "Do naší svatby zbývá", units: ["Dní", "Hodin", "Minut", "Sekund"], story: "Náš příběh",
    storyText: "Sem doplňte krátký příběh o tom, jak jste se poznali a jak vznikl váš vztah.", photo: "Fotografie",
    schedule: "Program dne", events: [["15:00", "Příchod hostů"], ["16:00", "Obřad"], ["17:30", "Přípitek a gratulace"], ["19:00", "Svatební večeře"], ["21:00", "Tanec a oslava"]],
    venue: "Místo konání", venueName: "Název místa (doplňte)", address: "Ulice 123, 100 00 Město", map: "Zobrazit na mapě",
    dress: "Dress code", dressText: "Doplňte prosím doporučené oblečení, např. elegantní společenský oděv. Vyhněte se bílé barvě.",
    gifts: "Dary", giftsText: "Vaše přítomnost je pro nás největším darem. Pokud byste nás přesto chtěli obdarovat, budeme rádi za příspěvek na naše společné dobrodružství.",
    rsvp: "Potvrďte prosím účast", deadline: "Prosíme o odpověď do 1. května 2027.", name: "Jméno a příjmení", attending: "Zúčastníte se?", yes: "Ano, s radostí přijdu", no: "Bohužel se nezúčastním", guests: "Počet doprovázejících osob", song: "Přání na skladbu (nepovinné)", message: "Vzkaz pro novomanžele (nepovinné)", submit: "Odeslat odpověď", thanks: "Děkujeme za vaši odpověď!", close: "Zavřít", closing: "Těšíme se na Vás!", footer: "Vytvořeno s láskou pro náš velký den.", date: "20. června 2027",
  },
  tr: {
    prompt: "Açmak için mühüre dokunun", tagline: "İki hikaye, tek yol", welcome: "Düğünümüzde sizi aramızda görmekten mutluluk duyarız",
    countdown: "Düğünümüze kalan süre", units: ["Gün", "Saat", "Dakika", "Saniye"], story: "Hikayemiz",
    storyText: "Buraya nasıl tanıştığınızı ve ilişkinizin hikayesini kısaca ekleyin.", photo: "Fotoğraf",
    schedule: "Gün Programı", events: [["15:00", "Misafir Karşılama"], ["16:00", "Tören"], ["17:30", "Kokteyl ve Tebrikler"], ["19:00", "Düğün Yemeği"], ["21:00", "Dans ve Kutlama"]],
    venue: "Mekan", venueName: "Mekan adı (buraya ekleyin)", address: "Sokak adı 123, 34000 Şehir", map: "Haritada göster",
    dress: "Kıyafet Kodu", dressText: "Lütfen önerilen kıyafeti buraya ekleyin, örn. şık davet kıyafeti. Beyaz giymekten kaçınınız.",
    gifts: "Hediyeler", giftsText: "Varlığınız bizim için en büyük hediyedir. Yine de bir hediye düşünüyorsanız, ortak geleceğimize katkı bizi çok mutlu eder.",
    rsvp: "Lütfen katılımınızı bildirin", deadline: "Lütfen 1 Mayıs 2027 tarihine kadar yanıtlayın.", name: "Ad Soyad", attending: "Katılacak mısınız?", yes: "Evet, seve seve katılırım", no: "Maalesef katılamayacağım", guests: "Sizinle birlikte katılacak kişi sayısı", song: "Şarkı isteği (isteğe bağlı)", message: "Çift için mesajınız (isteğe bağlı)", submit: "Yanıtı Gönder", thanks: "Yanıtınız için teşekkür ederiz!", close: "Kapat", closing: "Sizi aramızda görmekten mutluluk duyarız!", footer: "Özel günümüz için sevgiyle hazırlandı.", date: "20 Haziran 2027",
  },
} as const;

function InvitationPage() {
  const [opened, setOpened] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const [language, setLanguage] = useState<keyof typeof copy>("cs");
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const text = copy[language];
  const handleEnvelopeOpened = useCallback(() => setOpened(true), []);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const remaining = Math.max(0, weddingTime - now);
  const countdown = [
    Math.floor(remaining / 86400000),
    Math.floor((remaining / 3600000) % 24),
    Math.floor((remaining / 60000) % 60),
    Math.floor((remaining / 1000) % 60),
  ] as const;

  const submitRsvp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className={opened ? "invitation invitation--opened" : "invitation"}>
      <EnvelopeIntro
        monogram="J & A"
        date="20 · 06 · 2027"
        prompt={text.prompt}
        onOpened={handleEnvelopeOpened}
      />

      <nav className="invitation-nav" aria-label="Invitation controls">
        <div className="language-switch" aria-label="Language">
          <Button variant="quiet" size="sm" aria-pressed={language === "cs"} onClick={() => setLanguage("cs")}>CS</Button>
          <Button variant="quiet" size="sm" aria-pressed={language === "tr"} onClick={() => setLanguage("tr")}>TR</Button>
        </div>
      </nav>

      <section className="invitation-hero">
        <div className="hero-monogram" aria-hidden="true">J & A</div>
        <p className="eyebrow">{text.tagline}</p>
        <h1>Jana <i>&</i> Ahmet</h1>
        <p className="hero-date">{text.date}</p>
        <span className="ornament" aria-hidden="true">❦</span>
        <p className="hero-invitation">{text.welcome}</p>
      </section>

      <section className="invitation-section countdown-section" aria-labelledby="countdown-title">
        <p className="section-kicker">20 · 06 · 2027</p>
        <h2 id="countdown-title">{text.countdown}</h2>
        <div className="countdown-grid">
          {countdown.map((value, index) => (
            <div className="countdown-item" key={text.units[index]}>
              <strong>{String(value).padStart(2, "0")}</strong>
              <span>{text.units[index]}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="invitation-section story-section" aria-labelledby="story-title">
        <p className="section-kicker">J & A</p>
        <h2 id="story-title">{text.story}</h2>
        <p className="section-copy">{text.storyText}</p>
        <div className="story-gallery">
          {[1, 2, 3].map((item) => <div className="photo-placeholder" key={item}><span>{text.photo} {item}</span></div>)}
        </div>
      </section>

      <section className="invitation-section schedule-section" aria-labelledby="schedule-title">
        <p className="section-kicker">20 · 06 · 2027</p>
        <h2 id="schedule-title">{text.schedule}</h2>
        <ol className="timeline">
          {text.events.map(([time, label]) => <li key={time}><time>{time}</time><span aria-hidden="true" /><strong>{label}</strong></li>)}
        </ol>
      </section>

      <section className="invitation-section venue-section" aria-labelledby="venue-title">
        <p className="section-kicker">Prague</p>
        <h2 id="venue-title">{text.venue}</h2>
        <strong className="venue-name">{text.venueName}</strong>
        <p>{text.address}</p>
        <a className="map-link" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(text.address)}`} target="_blank" rel="noreferrer">{text.map}</a>
      </section>

      <section className="invitation-section details-section" aria-label={`${text.dress} & ${text.gifts}`}>
        <div><span className="ornament" aria-hidden="true">❦</span><h2>{text.dress}</h2><p>{text.dressText}</p></div>
        <div><span className="ornament" aria-hidden="true">❦</span><h2>{text.gifts}</h2><p>{text.giftsText}</p></div>
      </section>

      <section className="invitation-section rsvp-section" aria-labelledby="rsvp-title">
        <span className="ornament" aria-hidden="true">❦</span>
        <h2 id="rsvp-title">{text.rsvp}</h2>
        <p>{text.deadline}</p>
        <Button variant="primary" size="md" onClick={() => setRsvpOpen(true)}>RSVP</Button>
      </section>

      <section className="invitation-section closing-section">
        <h2>{text.closing}</h2><p>Jana <i>&</i> Ahmet</p>
      </section>
      <footer className="invitation-footer">{text.footer}</footer>

      {rsvpOpen && <div className="rsvp-modal" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setRsvpOpen(false)}>
        <section className="rsvp-dialog" role="dialog" aria-modal="true" aria-labelledby="rsvp-dialog-title">
          <Button variant="quiet" size="icon" className="modal-close" aria-label={text.close} onClick={() => setRsvpOpen(false)}>×</Button>
          <h2 id="rsvp-dialog-title">{text.rsvp}</h2>
          {submitted ? <p className="rsvp-thanks">{text.thanks}</p> : <form onSubmit={submitRsvp}>
            <label>{text.name}<input name="name" required /></label>
            <label>{text.attending}<select name="attending"><option value="yes">{text.yes}</option><option value="no">{text.no}</option></select></label>
            <label>{text.guests}<input type="number" name="guests" min="0" defaultValue="0" /></label>
            <label>{text.song}<input name="song" /></label>
            <label>{text.message}<textarea name="message" rows={4} /></label>
            <Button type="submit" variant="primary">{text.submit}</Button>
          </form>}
        </section>
      </div>}
    </main>
  );
}
