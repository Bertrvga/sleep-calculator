import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import LegalArticle from "@/components/LegalArticle";

export const metadata: Metadata = {
  alternates: { canonical: "/terms" },
  title: "Kullanım Şartları",
  description:
    "Uyku Hesaplayıcı hizmetinin kullanım şartları, sorumluluk reddi ve fikri mülkiyet bildirimleri.",
};

export default function TermsPage() {
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
        <FileText className="h-3.5 w-3.5 text-moon-400" />
        Son güncelleme: {new Date().getFullYear()}
      </div>

      <h1>Kullanım Şartları</h1>
      <p>
        <strong>Uyku Hesaplayıcı</strong>'ya hoş geldiniz. Bu Kullanım Şartları
        ("Şartlar"), sitemize erişim ve site üzerinden sunulan hizmetlerin
        kullanımını düzenler. Siteyi kullanarak bu Şartları kabul etmiş
        sayılırsınız.
      </p>

      <h2>1. Hizmetin Kapsamı</h2>
      <p>
        Site, 90 dakikalık ortalama uyku döngüsü modeline dayanarak ideal yatma
        ve uyanma saatlerini hesaplamanıza yardımcı olan ücretsiz bir araçtır.
        Sunulan sonuçlar bilgilendirme amaçlıdır ve profesyonel tıbbi tavsiye
        yerine geçmez.
      </p>

      <h2>2. Sağlık Sorumluluk Reddi</h2>
      <p>
        Uyku hesaplama sonuçları, kişisel farklılıklar, sağlık durumu, yaş ve
        yaşam tarzına göre değişkenlik gösterebilir. Uyku sorunları yaşıyorsanız
        veya uzun süreli uyku düzensizlikleri fark ediyorsanız bir sağlık
        profesyoneline danışın. Site, herhangi bir tıbbi teşhis veya tedavi
        sağlamaz.
      </p>

      <h2>3. Kabul Edilebilir Kullanım</h2>
      <ul>
        <li>Siteyi yasadışı veya yetkisiz bir amaçla kullanmamayı,</li>
        <li>
          Siteyi bozmaya, aşırı yüklemeye veya zarar vermeye yönelik girişimlerde
          bulunmamayı,
        </li>
        <li>
          Otomatik araçlarla (bot, scraper vb.) izin verilenin ötesinde toplu
          erişim sağlamamayı kabul edersiniz.
        </li>
      </ul>

      <h2>4. Fikri Mülkiyet</h2>
      <p>
        Sitedeki tüm içerik, tasarım, logo, kod ve metinler, aksi belirtilmedikçe
        Uyku Hesaplayıcı'ya aittir ve telif hakkı yasalarıyla korunur. İçeriğin
        önceden yazılı izin alınmadan kopyalanması, çoğaltılması veya
        değiştirilmesi yasaktır.
      </p>

      <h2>5. Üçüncü Taraf Bağlantıları ve Reklamlar</h2>
      <p>
        Site, üçüncü tarafların web sitelerine bağlantılar veya reklamlar
        içerebilir. Bu üçüncü tarafların içeriğinden veya gizlilik
        uygulamalarından sorumlu değiliz.
      </p>

      <h2>6. Sorumluluğun Sınırlandırılması</h2>
      <p>
        Site "olduğu gibi" ve "mevcut olduğu şekilde" sunulur. Kullanımdan
        kaynaklanan doğrudan veya dolaylı zararlar için, yürürlükteki yasaların
        izin verdiği azami ölçüde sorumluluk kabul etmiyoruz.
      </p>

      <h2>7. Şartlardaki Değişiklikler</h2>
      <p>
        Bu Şartları herhangi bir zamanda güncelleyebiliriz. Güncel sürüm daima
        bu sayfada yayınlanır. Siteyi kullanmaya devam etmeniz, güncellenmiş
        Şartları kabul ettiğiniz anlamına gelir.
      </p>

      <h2>8. Uygulanacak Hukuk</h2>
      <p>
        Bu Şartlar, Türkiye Cumhuriyeti yasalarına tabidir. Uyuşmazlıklarda
        Türkiye Cumhuriyeti mahkemeleri yetkilidir.
      </p>

      <h2>9. İletişim</h2>
      <p>
        Sorularınız için <Link href="/contact">İletişim</Link> sayfamızdan bize
        ulaşabilirsiniz.
      </p>
    </LegalArticle>
  );
}
