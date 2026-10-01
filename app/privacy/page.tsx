import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import LegalArticle from "@/components/LegalArticle";

export const metadata: Metadata = {
  alternates: { canonical: "/privacy" },
  title: "Gizlilik Politikası",
  description:
    "Uyku Hesaplayıcı gizlilik politikası: hangi verileri topluyoruz, çerezler, üçüncü taraf reklamcılar ve haklarınız.",
};

export default function PrivacyPage() {
  return (
    <LegalArticle>
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Ana sayfaya dön
      </Link>

      <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
        <ShieldCheck className="h-3.5 w-3.5 text-moon-400" />
        Son güncelleme: {new Date().getFullYear()}
      </div>

      <h1>Gizlilik Politikası</h1>
      <p>
        Bu Gizlilik Politikası, <strong>Uyku Hesaplayıcı</strong> web sitesini
        (bundan sonra "Site" olarak anılacaktır) ziyaret ettiğinizde
        toplayabileceğimiz bilgileri, bu bilgileri nasıl kullandığımızı ve
        haklarınızı açıklar. Sitemizi kullanarak bu politikayı kabul etmiş
        sayılırsınız.
      </p>

      <h2>1. Topladığımız Bilgiler</h2>
      <p>
        Uyku hesaplama işlemi tamamen tarayıcınızda gerçekleşir. Girdiğiniz
        saatler veya tercihler <strong>sunucularımıza gönderilmez</strong> ve
        tarafımızca saklanmaz. Bunun dışında aşağıdaki bilgiler otomatik olarak
        toplanabilir:
      </p>
      <ul>
        <li>Ziyaret ettiğiniz sayfalar ve site içindeki gezinme davranışınız</li>
        <li>
          Tarayıcı türü, işletim sistemi, cihaz türü ve genel konum (ülke/şehir)
        </li>
        <li>Sitede geçirdiğiniz süre ve yönlendirildiğiniz kaynak</li>
      </ul>

      <h2>2. Çerezler (Cookies)</h2>
      <p>
        Site, kullanıcı deneyimini iyileştirmek, tercihleri hatırlamak ve reklam
        göstermek amacıyla çerezler kullanabilir. Tarayıcı ayarlarınızdan
        çerezleri istediğiniz zaman devre dışı bırakabilirsiniz; ancak bu
        durumda bazı özellikler düzgün çalışmayabilir.
      </p>

      <h2>3. Üçüncü Taraf Reklamcılar</h2>
      <p>
        Sitemizde <strong>Google AdSense</strong> gibi üçüncü taraf reklam
        ağları aracılığıyla reklam yayınlanabilir. Bu ağlar, kullanıcılara ilgi
        alanlarına uygun reklamlar sunmak amacıyla çerezler ve benzeri
        teknolojiler kullanabilir. Google'ın reklam çerezlerini kullanma şekli
        hakkında daha fazla bilgi için{" "}
        <a
          href="https://policies.google.com/technologies/ads"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Reklam Politikaları
        </a>{" "}
        sayfasını ziyaret edebilirsiniz.
      </p>

      <h2>4. Analitik</h2>
      <p>
        Site trafiğini ve kullanıcı davranışını anlamak için Google Analytics
        gibi anonim analitik hizmetlerinden faydalanabiliriz. Toplanan veriler
        toplu ve anonim olarak analiz edilir.
      </p>

      <h2>5. Bilgi Güvenliği</h2>
      <p>
        Hesaplamalar tarayıcınızda çalıştığından, kişisel verilerinizi işleme
        gereksinimimiz asgari düzeydedir. Yine de sunucu tarafında toplanabilecek
        anonim verileri korumak için makul teknik ve idari önlemler alıyoruz.
      </p>

      <h2>6. Çocukların Gizliliği</h2>
      <p>
        Site, 13 yaşın altındaki çocuklara yönelik değildir ve bilerek bu yaş
        grubundan veri toplamayız.
      </p>

      <h2>7. Politikadaki Değişiklikler</h2>
      <p>
        Bu politikayı zaman zaman güncelleyebiliriz. Güncel sürümü daima bu
        sayfada yayınlarız; önemli değişiklikleri belirgin biçimde işaretleriz.
      </p>

      <h2>8. İletişim</h2>
      <p>
        Gizlilik uygulamalarımız hakkında sorularınız için{" "}
        <Link href="/contact">İletişim</Link> sayfamız üzerinden bize
        ulaşabilirsiniz.
      </p>
    </LegalArticle>
  );
}
