import React, { Component, Fragment } from "react";
import Header from "../components/Header";
import Leftnav from "../components/Leftnav";
import Rightchat from "../components/Rightchat";
import Appfooter from "../components/Appfooter";
import Popupchat from "../components/Popupchat"; 
import { Link } from "react-router-dom";
class ShopOne extends Component {
  constructor(props) {
    super();
    this.state = {
      login: false,
    };
  }

  componentDidMount() {
    let token = localStorage.getItem("token");
    if (token) {
      this.setState({
        login: true,
      });
    }
  }
  render() {
    return (
      <Fragment>
        {this.state.login && (
          <>
            <Header />
            <Leftnav />
            <Rightchat />
          </>
        )}

        <div
          className={
            this.state.login &&
            "bg-white main-content right-chat-active about-team-wrapper"
          }
        >
          <div className={this.state.login && "middle-sidebar-bottom"}>
            <div
              className={
                this.state.login
                  ? "middle-sidebar-left about_bg"
                  : "container about_bg"
              }
            >
              <div className="mt-3 row">
                <div className="col-xl-12 col-xxl-12 col-lg-12">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="card p-md-5 p-4 bg-primary-gradiant rounded-3 shadow-xss bg-pattern border-0 overflow-hidden">
                        <div className="bg-pattern-div"></div>
                        <h2 className="display2-size display2-md-size fw-700 text-white mb-0 mt-0">
                          <Link
                            to="/"
                            className="mt-2 d-inline-block text-white"
                          >
                            <i className="text-white ti-arrow-left font-sm me-3 font-xl"></i>
                            TERMS & CONDITIONS
                          </Link>
                        </h2>
                      </div>
                    </div>

                    <div className="col-md-12 col-12 py-5">
                    
                      <p className="py-2 about-team-paragraph">
                        Kaikkien yksityishenkil??iden ja yritysten, jotka
                        k??ytt??v??t Global Fansy Oy:n sovelluksia tai palveluita
                        oletetaan lukeneen ja hyv??ksyneen seuraavat k??ytt??ehdot.
                        Jos et hyv??ksy ehtoja pyyd??mme olemaan k??ytt??m??tt??
                        sovelluksiamme ja palveluitamme sek?? sivustojamme. T??m??
                        sopimus on voimassa 5/12/2021 l??htie
                        <br></br>
                        <br></br>
                        Miksi ker????mme tietoja ja mink?? vuoksi sopimusehdot on
                        hyv??ksytt??v??:
                        <br></br>
                        Verkkosivustomme osoite on: https://www.globalfansy.com
                        ja https://www.globalfansy.fi ja digimarkkinoinnin
                        sivustomme Facebookissa sek?? Instagramissa. T??m?? on
                        Global Fansy Oy:n henkil??tietolain (10 ja 24 ??) ja EU:n
                        yleisen GDPR-asetusten mukainen rekisteri- ja
                        tietosuojaseloste. Laadittu 15.11.2021 ja p??ivitetty
                        5.12.2021.
                        <br></br>
                        <br></br>
                        K??ytt??tarkoitus on yll??pit???? asiakas- ja
                        markkinointirekisteri??, antaa sis??ll??ntuottajien
                        k??ytt????n Global Fansyn alusta joihin rekister??inti
                        tietoja tarvitaan sek?? verkkopalvelun
                        k??ytt??j??rekisteri??. Sis??ll??ntuottaja luo
                        henkil??kohtaisesti tilin Stripe maksunv??litt??j??n kanssa.
                        Rekisterin yll??pit??j?? on Global Fansy Oy (Y-tunnus
                        3223630-9), Tanja Kauriinoja, tanja (@) globalfansy.com.
                        <br></br>
                        <br></br>
                        Yksityisyyden suojaaminen on Global Fansy Oy:lle
                        eritt??in t??rke????. Jotta voimme tarjota asiakkaillemme
                        palveluita, tehd?? viestint???? ja markkinointia, meid??n on
                        v??ltt??m??t??n k??sitell?? asiakasrekisterin tietoja. Pyrimme
                        k??sittelem????n kaikkea meille annettuja tietoja
                        vastuullisesti, tietoturvallisesti ja l??pin??kyv??sti.
                        Varaamme oikeuden p??ivitt???? n??it?? ev??stek??yt??nt??j??
                        palveluiden kehityksen taikka lains????d??nn??n tai
                        viranomaissuositusten muuttumisen vuoksi. Ker????m??mme
                        tiedot ovat henkil??n nimi, yritys/organisaatio
                        (Y-tunnus), yhteystiedot, verkkosivujemme
                        yhteydenottolomakkeen tiedot, www-sivustojen osoitteet,
                        IP-osoite, sosiaalisen median k??ytt??j??profiilin julkiset
                        tiedot, tarjouksiin ja sopimukseen liittyv??t
                        palvelukuvaukset, laskutustiedot, asiakassuhteen
                        hoitamisen kannalta olennaiset ja v??ltt??m??tt??mimm??t
                        tiedot.
                        <br></br>
                        <br></br>
                        <b>Global Fansy Oy</b>
                        <br />
                        <b>Y-tunnus: 3223630-9</b>
                        <br />
                        <b>VAT: FI322630-9</b>
                        <br />
                        <b>Osoite: Kansankatu 4, 96100 Rovaniemi</b>
                        <br />
                        <b>S??hk??posti: info@globalfansy.com</b> <br />
                        <b>Numero: +358 45 800 8020</b>
                        <br />
                        <b>Yhteyshenkil??: Tanja Kauriinoja, toimitusjohtaja</b>
                        <br />
                        <h4 className="pt-5 font-xsss ">
                          1. K??YTT??EHTOJEN HYV??KSYMINEN
                        </h4>
                        Seuraavassa kirjattu Palvelun K??ytt??ehtosopimus on
                        laillisesti sitova sopimus, joka kattaa k??ytt??jiemme ja
                        muiden palvelun kanssa vuorovaikutuksessa olevien
                        v??lisen suhteen Rovaniemell??, Suomessa sijaitsevan
                        Global Fansy Oy:n ja yhteisty??tahojemme kanssa. Sopimus
                        kattaa kaikki Global Fansy Oy:n tarjoamat palvelut
                        internetalustalla, eli verkkosivuston palveluineen sek??
                        mobiilisovelluksen, joiden sis??ll??n kuvaus sis??ltyy
                        sopimukseen.
                        <br />
                        <h4 className="pt-5 font-xsss ">
                          2. GLOBAL FANSY Oy:n VERKKOALUSTAN PALVELUKUVAUS
                        </h4>
                        T??m?? verkkoalusta on yhteis??llinen verkostoitumispalvelu
                        internetiss?? jossa on mahdollisuus my??s digitaaliseen
                        markkinointiin, palvelujen myyntiin ja tuottamiseen.
                        N??it?? ovat esimerkiksi sosiaalisen median
                        sis??ll??ntuotanto, verkkokurssit suoratoistopalveluna tai
                        muussa digitaalisessa muodossa, konsertit, digitaaliset
                        n??yttelyt, mahdollisuus tuotteiden verkkokauppaan ja
                        niin edelleen, kaikki samalla verkkoalustalla. Sivuston
                        kuvaus on seuraavanlainen;
                        <br />
                        <br />
                        Global Fansy on yhteis??llinen verkostoitumispalvelu
                        internetiss?? tapahtuma-alustalla. Se on rakennettu
                        antamaan digitaalisen sis??ll??ntuottajille, esiintyjille,
                        luennoitsijoille ja kouluttajille mahdollisuus julkaista
                        valokuva-, dokumentti- ja videosis??lt????, sek??
                        suoratoistopalvelusis??lt????, t??ten mahdollistaen
                        tuotteistaa sis??lt??ns?? ja mahdollisuuden rahan
                        ansaitsemiseen k??ytt??jien maksaessa maksullisen sis??ll??n
                        katsomisesta ja/tai tilaamisesta. Verkkosivusto ja
                        mobiilisovellus tekee k??ytt??j??lle helpoksi nauttia
                        striimatuista livetapahtumista, kokouksista ja
                        kokoontumisista, konserteista ja toisten ihmisten
                        tapaamisesta ja vuorovaikutuksesta verkossa. Tapahtumien
                        / palvelujen / tuotteiden digitaalinen markkinointi on
                        yksinkertaista ja tehokasta palvelussa. Global Fansy
                        Oy:ll?? on my??s mahdollisuus markkinoida valitsemiensa
                        asiakkaidensa tapahtumia / palveluja / tuotteita.
                        <br />
                        Kaikki palveluun rekister??ityneet luetaan
                        palvelunk??ytt??jiksi ja siten ovat t??m??n
                        k??ytt??ehtosopimuksen ehtojen piiriss??.
                        <br />
                        K??ytt??j?? tiedostaa ja hyv??ksyy, ett?? kaikki olemassa
                        olevat palvelut verkkosivulla ja sovelluksessa ovat
                        Global Fansy Oy:n omaisuutta. Palveluun kuuluvia
                        sovelluksia saatetaan jakaa erilaisilla verkkoalustoilla
                        ja sosiaalisessa mediassa. Global Fansy Oy voi k??ytt????
                        mahdollisuutta tarjota muita verkkopalveluita ja/tai
                        tuotteita, tai p??ivitt????, muokata tai muuttaa mit??
                        tahansa olemassa olevaa sis??lt???? ja palvelua, ja t??m??
                        sopimus kattaa n??in tapahtuessa kaikki n??m?? vaihtoehdot,
                        mik??li ei toisin ilmoiteta. Global Fansy Oy pid??tt????
                        oikeuden perua ja lopettaa kaikki edell?? mainitut
                        palvelut ja/tai tuotteet. K??ytt??j??n?? tiedostat ja
                        hyv??ksyt Global Fansyn vastuuvapauden edell?? mainituissa
                        tilanteissa. Global Fansyn k??ytt??j??n?? jatkaminen edell??
                        mainituissa tilanteissa katsotaan niiden hyv??ksymiseksi.
                        T??m??n k??ytt??ehtosopimuksen s????nn??llinen lukeminen on
                        siksi suositeltavaa ajantasaisen sopimussis??ll??n
                        ymm??rt??miseksi. Jos edell?? mainitun kaltaisten
                        mahdollisten muutosten takia et voi en???? hyv??ksy??
                        sopimuksen sis??lt????, tulee palvelun k??ytt?? lopettaa.{" "}
                        <br />
                        <br />
                        Lis??ksi k??ytt??j?? ymm??rt???? ja hyv??ksyy sen, ett?? palvelut
                        tarjotaan sellaisena kuin ne ovat ja siten Global Fansy
                        Oy ei ole vastuullinen tai velvollinen tilanteissa,
                        kuten toimitusvaikeuksien, sis??ll??n, kommunikaation tai
                        tallennusvirheiden takia. Global Fansy Oy veloittaa 20%
                        + alv kaikista palveluidemme kautta tapahtuvista
                        myynneist??.
                        <h4 className="pt-5 font-xsss ">
                          3. REKISTER??ITYMINEN
                        </h4>
                        K??ytt??j??n tulee olla 18 vuotta vanha (t??ysi-ik??inen)
                        rekister??ity??kseen palveluun ja solmiakseen
                        lainvoimaisen sopimuksen, ja t??ten pysty??kseen
                        k??ytt??m????n palvelussa tarjolla olevaa maksullista
                        sis??lt????. Ala-ik??isten j??senyyteen tarvitaan huoltajan
                        suostumus. Alaik??isen tulee kuitenkin olla v??hint????n 15
                        vuotta vanha. Sinun tulee olla oikeustoimikelpoinen,
                        eik?? sinulta ole aikaisemmin ev??tty j??senyytt?? Global
                        Fansy Oy:n palveluissa Suomen lain tai sen asetusten
                        rikkomisen takia. Rekister??ityv?? osapuoli ymm??rt???? ja
                        hyv??ksyy ett??:
                        <br />
                        - tietojen ker??ys- ja rekister??intiprosessissa antaa
                        vain todenmukaisia, oikeita ja t??ydellisi?? tietoja
                        itsest????n kuten niit?? pyydet????n; - Ja yll??pit???? ja
                        p??ivitt???? tarvittaessa henkil??kohtaiset tietonsa
                        ajantasaisuuden ja t??ydellisyyden saavuttamiseksi.
                        <br />
                        Jos joku tietoisesti antaa v????r????, valheellista,
                        virheellist?? tai ep??tarkkaa tietoa itsest????n, on t??m??
                        Global Fansy Oy:lle riitt??v?? syy ja oikeus pid??tt????
                        nykyinen k??ytt??oikeus palveluihin tai lopettaa se, kuin
                        my??s olla my??nt??m??tt?? k??ytt??oikeutta
                        tulevaisuudessakaan.
                        <br />
                        Global Fansy Oy:n prioriteetti on taata k??ytt??jiens??
                        turvallisuus ja yksityisyys, erityisesti
                        alaik??isten/lasten. T??st?? syyst?? alaik??isten/lasten
                        vanhempien tai huoltajien, jotka sallivat heid??n k??ytt????
                        Global Fansy Oy:n palveluita, on kannettava kaikki
                        vastuu verkkosivun ja sovelluksen palvelujen sis??ll??st??
                        ja sen sopivuudesta huollettavalleen. Lis??ksi Global
                        Fansy Oy ei ole vastuuussa palvelujen ep??soveliaasta
                        k??yt??st??, rahallinen k??ytt?? mukaan lukien, k??ytt??jien
                        toimesta, jotka eiv??t kykene ymm??rt??m????n t??m??n
                        k??ytt??ehtosopimuksen sis??lt????.
                        <h4 className="pt-5 font-xsss ">
                          4. YKSITYISYYDEN SUOJA
                        </h4>
                        Global Fansy Oy suojaa tarkasti kaikkien k??ytt??jien
                        rekister??itymisess?? annettuja ja muita henkil??kohtaisia
                        tietoja, kuten Global Fansy Oy:n Tietosuoja,- ja
                        Rekisteriselosteessa on mainittu (linkki siihen).
                        K??ytt??j??n?? annat luvan tietojen ker????miseen ja niiden
                        k??ytt????n, mukaan lukien tietojen siirtoon Euroopan
                        Unionin ja muiden maiden sis??ll?? varastoinnin,
                        prosessoinnin tai Global Fansy Oy:n ja sen
                        yhteisty??kumppanien k??ytt??tarkoituksien takia.
                        <h4 className="pt-5 font-xsss ">
                          5. K??YTT??J??TILI, K??YTT??J??NIMI, SALASANA JA
                          K??YTT??TURVALLISUUS
                        </h4>
                        Kun olet rekister??itynyt ja luonut k??ytt??j??tilin,
                        k??ytt??j??nimen sek?? salasanan, saat vahvistuss??hk??postin
                        ja tilisi avataan. Olet itse vastuullinen salasanasi
                        salassapidosta ja luotettavuudesta, ja kaikista
                        tilill??si nimell??si tapahtuvista tapahtumista ja
                        toimista. Jos huomaat, ett?? tilillesi kirjaudutaan tai
                        k??ytet????n sit?? luvattomasti, tai ep??ilet salasanasi
                        joutuneen toiselle henkil??lle tai muuta
                        ep??luotettavuutta, on velvollisuutesi ilmoittaa t??st??
                        Global Fansy Oy:lle. Edell?? kuvatun kaltaisessa
                        tilanteessa Global Fansy Oy ei ole vastuullinen
                        mahdollisista menetyksist?? ja/tai haitoista, joita t??st??
                        aiheutuu.
                        <h4 className="pt-5 font-xsss ">6. K??YT??NT????NPANO</h4>
                        Sivuston ja sovelluksen k??ytt??j??n?? tiedostat, ymm??rr??t
                        ja hyv??ksyt sen, ett?? kaikki informaatio, teksti,
                        ohjelmisto, tieto, valokuvat, musiikki, videot, viestit,
                        suoratoistot ja merkinn??t tai muu sis??lt??, on se sitten
                        julkisesti tai yksityisesti tuotettua ja/tai jaettua, on
                        ainoastaan sen tekij??n ja/tai jakajan vastuulla. Olet
                        vastuussa kaikesta tuottamastasi, jakamastasi,
                        lataamastasi, viestim??st??si, siirt??m??st??si tai muulla
                        tavalla Global Fansy Oy:n kautta esille tuomastasi
                        sis??ll??st??. Siten Global Fansy Oy ei ole vastuussa
                        k??ytt??jien tekem??n ja/tai jakaman ja palvelussa
                        julkaistun sis??ll??n paikkaansapit??vyydest??,
                        todenper??isyydest??, oikeellisuudesta, rehellisyydest??
                        tai laadusta. K??ytt??m??ll?? palvelua ymm??rr??t ja sitoudut,
                        ett?? voit altistua kaikenlaiselle sis??ll??lle ja Global
                        Fansy Oy ei ole vastuullinen haitasta tai tappiosta,
                        jota sen palveluissa edell?? mainituin tavoin jaettu ja
                        tuotettu sis??lt?? mahdollisesti voi aiheuttaa.
                        <br />
                        Lis??ksi sitoudut olla k??ytt??m??tt?? Global Fansy Oy:n
                        alustaa seuraaviin tarkoituksiin: - ladata, julkaista,
                        l??hett???? yksityisviesteill??, siirt????, suoratoistaa tai
                        jakaa muulla tavalla alustan kautta sis??lt????, joka on
                        laitonta, haitallista, vaarallista, hyv??ksik??ytt??v????,
                        ahdistelevaa, kiduttavaa, herjaavaa, vulg????ri??,
                        h??vyt??nt??, loukkaavaa, yksityisyytt?? uhkaavaa, tai vihaa
                        lietsovaa rotua, etnisyytt?? ja/tai muulla tavalla
                        vastustettavaa; - alaik??isi?? mill????n tavalla
                        vahingoittavaa;
                        <br />
                        - esiinty?? jonain toisena yksil??n?? tai ryhm??n??, mukaan
                        lukien kaikki Global Fansy Oy:n edustajat, foorumien
                        johtajat, ohjaajat ja is??nn??t/em??nn??t tai valheellisesti
                        esitt???? yhteys / edustus johonkin yksil????n tai ryhm????n.
                        <br />
                        - v????rent???? otsikoita, nimikkeit?? tai julkaisujen nimi??
                        tai muulla tavalla tarjota sis??lt????, johon sinulla ei
                        ole lainmukaista oikeutta tai sopimus- tai
                        luottamusoikeutta; - ladata, julkaista, l??hett????
                        yksityisviestill??, siirt????, suoratoistaa tai jakaa
                        muulla tavalla alustan kautta sis??lt????, joka rikkoo
                        patentti-, copyright-, trademark tai muuta tekij??n- tai
                        omistusoikeutta rikkovaa sis??lt????;
                        <br />
                        - ladata, julkaista, l??hett???? yksityisviestill??,
                        siirt????, suoratoistaa tai jakaa muulla tavalla alustan
                        kautta sis??lt????, johon sinulla henkil??kohtaisesti ei ole
                        lain tuomia oikeuksia, tai tekij??noikeussuojattua
                        sis??lt????;
                        <br />
                        - ladata, julkaista, l??hett???? yksityisviestill??,
                        siirt????, suoratoistaa tai jakaa muulla tavalla alustan
                        kautta sis??lt????, joka on oikeudetonta tai luvatonta
                        mainontaa, markkinointia, roskapostia tai sp??mmi??, tai
                        muuta myynnin tai muun sellaisen edist??mist??, muuta kuin
                        alustan tarkoitukseen osoittamilla alueilla;
                        <br />
                        - ladata, julkaista, l??hett???? yksityisviestill??,
                        siirt????, suoratoistaa tai jakaa muulla tavalla alustan
                        kautta sis??lt????, joka voi sis??lt???? virusohjelmistoja,
                        haittaohjelmistoja, tiedonkalasteluohjelmistoja,
                        tietokonekoodia, tiedostoja ja/tai muita ohjelmia, jotka
                        on tehty haittaaaman, tuhoamaan ja/tai rajoittamaan
                        mink?? tahansa tietokoneohjelmiston, kovalevyn tai
                        tietoliikenneyhteyksien laitteiden toimintaa;
                        <br />
                        - h??irik??id?? keskustelun ja kommunikaation normaalia
                        kulkua tai muutoin k??ytt??yty?? tavalla, joka vaikuttaa
                        negatiivisesti muiden k??ytt??jien mahdollisuuksiin
                        osallistua reaaliaikaiseen kanssak??ymiseen;
                        <br />
                        - puuttua tai h??irik??id?? mit?? tahansa Global Fansy Oy:n
                        tarjoamaa palvelua, serveri?? ja/tai verkostoa, joka on
                        yhteydess?? tai liityksiss?? verkkoalustaamme. T??m??
                        sis??lt????, muttei ole rajoitettu koskemaan mit?? tahansa
                        laiteohjelmistoa ja/tai k??ytt??tapaa ohittamaan
                        robottitunnisteiden toimintaa
                        <br />
                        - rikkoa kansallista tai kansainv??list?? lakia
                        tarkoituksella tai vahingossa;
                        <br />
                        - k??ytt???? Global Fansy Oy:n tarjoamaa alustaa alustana
                        ja levitt???? kiihotusta kansanryhm???? kohtaan, kuten
                        rodun, etnisyyden tai uskonnollisen vakaumuksen takia;
                        <br />
                        - k??ytt???? Global Fansy Oy:n alustaa
                        rahanpesutarkoitukseen;
                        <br />
                        - jakaa sis??lt???? tai tukea, peitt???? ja/naamioida
                        henkil??, paikka tai l??hde, joka on liitoksissa
                        terroristiorganisaatioihin tai muuten tuottaa sis??lt????
                        terroristisessa tarkoituksessa;
                        <br />
                        - jatkuvasti vakoilla tai muussa tarkoituksessa
                        h??irik??id?? toista k??ytt??j????;
                        <br />
                        - ker??t?? tai tallentaa mit????n henkil??kohtaista tietoa
                        muusta k??ytt??j??st?? tavalla joka on kuvattu ja kielletty
                        aikaisemmissa kappaleissa.
                        <br />
                        - ladata, julkaista, l??hett???? yksityisviestill??,
                        siirt????, suoratoistaa tai jakaa muulla tavalla alustan
                        kautta sis??lt???? joka luokitellaan aikuisviihteeksi.
                        <br />
                        Global Fansy Oy pid??tt???? edell?? mainittuun vedoten
                        oikeuden esikatsella, kielt??yty?? ja/tai poistaa mit??
                        tahansa olemassa olevaa sis??lt???? alustaltaan. Lis??ksi
                        pid??t??mme oikeuden poistaa ja tuhota mit?? tahansa
                        sis??lt????, joka on k??ytt??ehtojen vastaista tai voisi
                        muulla tavalla olla loukkaavaa k??ytt??jille.
                        <br />
                        Global Fansy pid??tt???? oikeuden p????st?? k??siksi, s??ilytt????
                        ja/tai sulkea k??ytt??j??tilin tiedot ja/tai sis??ll??n, jos
                        sit?? velvoitetaan lain toimesta tai uskoen t??m??n toimen
                        olevan kohtuullisen v??ltt??m??t??nt?? seuraavista syist??:
                        <br />
                        - mink?? tahansa lain vaatiman toimenpiteen takia;
                        <br />
                        - k??ytt??ehtojen k??yt??nt????npanoa varten;
                        <br />
                        - vastatakseen mihin tahansa kolmannen osapuolen
                        esitt??m????n vaateeseen koskien k??ytt??oikeuksien
                        rikkomista;
                        <br />
                        - vastatakseen asiakaspalvelun kautta tulleisiin
                        pyynt??ihin;
                        <br />
                        - suojatakseen Global Fansy Oy:n ja sen tarjoaman alusta
                        k??ytt??jien oikeuksia, omaisuutta ja henkil??kohtaista
                        turvallisuutta, mukaan lukien suuri yleis??.
                        <br />
                        Global Fansy Oy t??ten pid??tt???? oikeuden k??ytt????
                        turvallisuustoimia tarpeen vaatiessa varmistamaan, ett??
                        digitaalinen informaatio tai materiaali on suojattua ja
                        ett?? niiden k??ytt?? on Global Fansy Oy:n m????rittelemien
                        k??ytt??ehtojen mukaista. Siten kaikki yritykset kiert????
                        tai rikkoa n??it?? ehtoja on kielletty??. Lis??ksi luvaton
                        kopiointi, julkaisu, jakaminen tai n??ytteillepano
                        alustallamme julkaistusta materiaalista, tehd????n se joko
                        sellaisenaan tai osittain, on kielletty.
                        <h4 className="pt-5 font-xsss ">
                          7. YHTI??N PALVELUIHIN TUOTETUSTA TAI JULKAISTUSTA
                          SIS??LL??ST??
                        </h4>
                        Global Fansy Oy ei varaa omistusoikeutta mihink????n
                        k??ytt??j??n alustalla tuottamaan ja julkaisemaan
                        sis??lt????n, tai k??yt?? sit?? omanaan
                        verkkosivupalveluissaan. Siten hyv??ksyt ja annat Global
                        Fansy Oy:lle alla listatut maailmanlaajuiset,
                        tekij??npalkkiovapaat ja kaikenkattavat lisenssit
                        k??ytt????n soveltuvin osin:
                        <br />
                        - Lisenssi sis??lt????n, joka on julkaistu tai tuotettu
                        julkisilla alueilla Global Fansy Oy:n alustalla, antaa
                        luvan k??ytt????, jakaa, kopioda, muokata, soveltaa,
                        julkisesti esitt???? ja/tai n??ytt???? mainittua sis??lt????,
                        ainoana tarkoituksena markkinoida alustaa, jonne sis??lt??
                        on julkaistu ja/tai tuotettu. T??m?? lisenssi on voimassa
                        niin kauan kuin olet Global Fansy Oy:n palvelujen
                        k??ytt??j?? ja sen voimassaolo loppuu jos valitset luopua
                        j??senyydest??.
                        <br />
                        - Lisenssi kuviin, ????nitiedostoihin, videoihin ja/tai
                        grafiseen sis??lt????n, joka on julkaistu tai tuotettu
                        julkisilla alueilla Global Fansy Oy:n alustalla, antaa
                        luvan k??ytt????, jakaa, kopioida, muokata, soveltaa,
                        julkisesti esitt???? ja/tai n??ytt???? mainittua sis??lt????,
                        ainoana tarkoituksena markkinoida alustaa, jonne sis??lt??
                        on julkaistu ja/tai tuotettu. T??m?? lisenssi on voimassa
                        niin kauan kuin olet Global Fansyn palvelujen k??ytt??j??
                        ja sen voimassaolo loppuu jos valitset luopua
                        j??senyydest??.
                        <br />
                        - Kaikki muut sis??lt??, joka on julkaistu ja/tai tuotettu
                        julkisilla alueilla Global Fansy Oy:n alustalla, ovat
                        jatkuvan, sitovan ja t??ysin alilisentoivan lisenssin
                        alla, joka tarkoittaa lupaa k??ytt????, jakaa, kopioida,
                        muokata, soveltaa, julkaista, k????nt????, julkisesti
                        esitt???? ja/tai n??ytt???? mainittua sis??lt????, joko
                        kokonaisuudessaan tai osia siit??, ja lupaa mainitun
                        matariaalin sis??llytt??misest?? osana toista miss?? tahansa
                        olemassa olevalla alustalla tai mediassa tai my??hemmin
                        kehitett??v??ll??.
                        <br />
                        Alueet, jotka ovat m????ritelty julkisesti saatavilla
                        oleviksi Global Fansy Oy:n sivustolla ja sovelluksessa,
                        ovat niit??, joihin on p????sy rekister??ityneell??
                        k??ytt??j??ll??, sis??lt??en foorumit, viestimet ja ryhm??t,
                        jotka ovat tarkoitettuja k??ytt??jille.
                     
                      <h4 className="pt-5 font-xsss ">
                        8. KEHITYSEHDOTUKSET YHTI??N PALVELUN TOIMINTAAN
                      </h4>
                      <br />
                      Global Fansy Oy tarjoaa k??ytt??jilleen mahdollisuuden
                      kehitysehdotuksiin verkko palveluistamme. Kun l??het??t
                      ideoita, dokumentteja ja ehdotuksia sivustostamme,
                      tiedostat ja hyv??ksyt ett??:
                      <br />
                      - ne eiv??t sis??ll?? mit????n salassapitovelvollisuuden tai
                      omistusoikeuden alaista tietoa;
                      <br />
                      - Global Fansy Oy ei ole vastuullinen tai velvoitettu
                      takaamaan tai s??ilytt??m????n tiedossa olevaa tai oletettua
                      salassapitoa mihink????n n??ihin edell?? mainittuihin
                      liittyen;
                      <br />
                      - Global Fansy Oy on oikeutettu k??ytt??m????n tai olla
                      k??ytt??m??tt?? edell?? listattuja parhaaksi katsomallaan
                      tavalla;
                      <br />
                      - edell?? listatuista kehitysehdotuksista tulee
                      automaattisesti Global Fansy Oy:n omaisuutta;
                      <br />
                      - Global Fansy Oy:ll?? ei ole velvollisuutta maksaa tai
                      korvata mill????n tavalla edell?? listatuista
                      kehitysehdotuksista.
                      <br />
                      <h4 className="pt-5 font-xsss ">9. VASTUUVAPAUS</h4>
                      Kaikkien k??ytt??jien tulee huolehtia ett?? Global Fansy
                      Oy:n, yhteisty??kumppanimme ja sidosryhm??mme,
                      ty??ntekij??mme, toimijamme ja/tai lisensoijamme s??ilyv??t
                      syytt??min?? tai vastuuvapaina kaikista vaateista tai
                      syytteist??, kolmansien osapuolien toimesta; vaikka ne
                      aiheutuisivat palveluun k??ytt??jien ja j??senien
                      tuottamasta, jakamasta julkaistusta, muokatusta,
                      siirretyst?? tai muuten k??ytt????n saatetusta sis??ll??st??,
                      Global Fansy Oy:n palvelujen k??ytt??misest??, k??ytt??j??n
                      k??ytt??ehtoja tai muita oikeuksia vastaan rikkomisesta sen
                      koskiessa ket?? tahansa muuta henkil????/kolmatta osapuolta.
                      <h4 className="pt-5 font-xsss ">
                        10. PALVELUJEN K??YTT?? KAUPALLISIIN TARKOITUKSIIN
                      </h4>
                      K??ytt??jien tulee sitoutua olla kopioimatta, toistamatta,
                      vaihtaa, myyd??, j??lleenmyyd?? tai muuten hyv??ksik??ytt????
                      Global Fansy Oy:n palvelujen sis??lt???? kaupallisiin
                      tarkoituksiin.
                      <br />
                      <h4 className="pt-5 font-xsss ">
                        11. K??YT??N JA TALLETTAMISEN YLEISET K??YT??NN??T
                      </h4>
                      Global Fansy Oy saattaa joutua asettamaan rajoituksia
                      palvelujensa k??ytt????n. N??it?? voivat olla maksimiaika,
                      kuinka kauan s??hk??posteja ja viestej?? sek?? muuta ladattua
                      sis??lt???? s??ilytet????n, tai l??hetettyjen ja vastaanotettujen
                      s??hk??postien ja viestien maksimim????r??, s??hk??postien
                      maksimikoko, s??ilytystilan suuruus palvelimellamme, ja/tai
                      palvelun k??yt??n maksimim????r?? ja/tai -aika tietyn ajan
                      kuluessa. Lis??ksi hyv??ksyt, ett?? Global Fansy Oy ei ole
                      vastuullinen tai velvollinen edell?? mainittujen
                      s??ilytt??misess?? tai sen ep??onnistuessa. Varaamme my??s
                      oikeuden poistaa k??ytt??j??tilin, joka on ep??aktiivinen
                      pidemm??n aikaa. Global Fansy Oy pid??tt???? oikeuden muokata,
                      muuttaa ja/tai p??ivitt???? n??it?? yleisi?? k??yt??nt??j?? ja
                      rajoituksia parhaaksi katsomallaan tavalla.
                      <br />
                      Kaikki viestimispalvelut, jotka kattavat my??s kaikki
                      verkkopohjaiset versiot, sallivat sinun ja henkil??iden,
                      joiden kanssa kommunikoit, tallentaa keskustelut
                      tilillesi, joka sijaitsee Global Fansy Oy:n palvelimilla.
                      T??ll?? tavalla p????set keskusteluhistoriaan milt?? tahansa
                      verkkoon kytketylt?? tietokoneelta tai ??lylaitteelta. Olet
                      my??s tietoinen, ett?? muut voivat tallentaa keskustelut
                      kanssasi heid??n omalle tililleen Global Fansyn alustalla.
                      T??m?? k??ytt??ehto sopimus m????ritt???? suostumuksesi siihen,
                      ett?? Global Fansy Oy:ll?? on oikeus tallettaa kaikki
                      kommunikaatiosi sen palvelimille.
                      <br />
                      <h4 className="pt-5 font-xsss ">12. MUOKKAUKSET</h4>
                      Global Fansy Oy pid??tt???? oikeuden koska vaan muokata,
                      muuttaa tai lopettaa palvelunsa, osittain tai kokonaan,
                      v??liaikaisesti tai pysyv??sti, ennakkoilmoituksella tai
                      ilman sit??. Lis??ksi emme ole vastuussa k??ytt??jille tai
                      mille tahansa kolmannelle osapuolelle n??ist?? luetelluista
                      toimista koituvasta haitasta tai menetyksist??.
                      <h4 className="pt-5 font-xsss ">
                        13. TILIN LOPETTAMINEN
                      </h4>
                      Global Fansy Oy:n verkkoalustan ja mobiilisovelluksen
                      k??ytt??j??n?? voit peruuttaa tai lopettaa k??ytt??j??tilisi,
                      siihen ja/tai p????syn palveluihin l??hett??m??ll?? peruutus-
                      tai lopetuspyynn??n osoitteeseen info@globalfancy.com
                      K??ytt??j??n?? hyv??ksyt, ett?? Global Fansy Oy:ll?? on oikeus,
                      ilman kirjallista ennakkoilmoitusta, v??litt??m??sti est????,
                      lopettaa ja/tai rajoittaa tilink??ytt??oikeuttasi ja p????sy??
                      palveluihimme. Syit?? edell?? mainittuihin voivat olla
                      seuraavaanlaiset:
                      <br />
                      - kaikki k??ytt??ehtoja ja s????nt??j?? vastaan rikkova toiminta
                      palvelussa;
                      <br />
                      - lainvalvojien tai muiden valtion tahojen vaatimus;
                      <br />
                      - palvelumme lopettaminen, muuttaminen ja/tai sen
                      sis??lt??m??n materiaalinen muokkaaminen, kokonaan tai
                      osittain;
                      <br />
                      - yll??tt??v??t tekniset tai turvallisuusongelmat palvelussa
                      <br />
                      - pitk?? ep??aktiivisuus tilin k??yt??ss??
                      <br />
                      - osallistuminen mihin tahansa petolliseen tai laittomaan
                      toimintaan.
                      <br />
                      Hyv??ksyt, ett?? kaikki tilin sulkemiseen, est??miseen ja
                      rajoittamiseen edell?? mainituista syist?? on vain Global
                      Fansy Oy:n harkinnan varassa, emmek?? ole vastuussa sinulle
                      tai kolmansille osapuolille koituvasta haitasta tai
                      menetyksest?? tilin tai siihen liittyv??n s??hk??postin
                      sulkemiseen ja/tai palvelujen k??yt??n rajoittamiseen
                      liittyen. Tilisi lopettaminen Global Fansy Oy:n alustalla
                      sis??lt???? seuraavaa:
                      <br />
                      <br />
                      - salasanasi ja kaikkien tietojesi, tiedostojesi ja kaiken
                      tiliisi liittyv??n ja sen sis??lt??m??n sis??ll??n poistaminen.
                      <br />- Kaiken alustamme palvelujen k??yt??n est??minen
                      tulevaisuudessa.
                      <h4 className="pt-5 font-xsss ">14. MAINOSTAJAT</h4>
                      Kaikki mainostajien kanssa tapahtuva viestint?? tai
                      kaupallinen yhteisty?? ja promootioihin osallistuminen,
                      olivat mainostajat alustallamme toimivia tai sen kautta,
                      ja n??ist?? yhteisty??sopimuksista seuraavat tavaran tai
                      palvelujen kaupat, maksut ja toimitukset, sek?? niihin
                      liittyv??t ehdot ja s????nn??t, takuut sek?? mit?? ne edustavat,
                      ovat pelk??st????n sinun ja mainostajan v??lisi?? sopimuksia.
                      Hyv??ksyt, ettei Global Fansy Oy ole vastuullinen n??ist??
                      sopimuksista suoraan mahdollisesti syntyv??st?? haitasta tai
                      menetyksest??, tai t??llaisen mainostajan l??sn??olosta
                      palvelussamme.
                      <h4 className="pt-5 font-xsss ">15. LINKIT</h4>
                      Sek?? Global Fansy Oy ett?? kolmannet osapuolet voivat
                      linkitt???? verkkosivujaan tai l??hteit????n palveluumme.
                      Pyyd??mme huomioimaan, ett?? Global Fansy oy ei ole
                      vastuullinen edell?? mainittujen ulkoisten verkkosivujen
                      tai l??hteiden saatavuudesta, ja siten emme kannusta niiden
                      k??ytt????n tai ole vastuullisia niiden sis??ll??n, tuotteen,
                      mainostamisen tai muun materiaalin suhteen. Lis??ksi
                      hyv??ksyt, ettei Global Fansy Oy:t?? voi pit???? vastuussa
                      suoraan tai ep??suoraan mist????n haitasta tai menetyksest??,
                      jota n??iden ulkoisten palveluiden tuotteisiin, palveluihin
                      tai sis??lt????n luottamisesta tai k??ytt??misest?? aiheutuu tai
                      v??itet????n aiheutuvan.
                      <h4 className="pt-5 font-xsss ">16. OMISTUSOIKEUDET</h4>
                      T??ten tiedostat ja hyv??ksyt, ett?? Global Fansy Oy:n
                      palvelut ja kaikki keskeinen ohjelmisto, joka on k??yt??ss??
                      palvelussamme, sis??lt???? omistusoikeudellista ja
                      luottamuksellista materiaalia, joka on suojattu soveltuvin
                      teollis- ja tekij??oikeuksin ja niihin liittyvien lakien
                      toimesta. Tiedostat my??s, ett?? kaikki mainokset ja
                      informaatio, joita on palvelussamme tai palvelumme kautta,
                      tai mainostajien toimesta, on suojattu vastaavilla
                      oikeuksilla ja lailla kuin edell?? on kerrottu. Siten
                      lukuunottamatta lain erikseen sallimissa tapauksissa tai
                      Global Fansy Oy:n tai vastaavan lisensoijan niin
                      salliessa, sitoudut olla muuttamatta, muokkaamatta,
                      leasaamatta, vuokraamatta, lainaamatta, myym??tt??,
                      toimittamatta, siirt??m??tt??, l??hett??m??tt?? julki, julkisesti
                      esitt??m??tt?? ja/tai plagioda Global Fansy Oy:n alustalla
                      julkaistua materiaalia, kokonaisuutena tai osana.
                      <br />
                      Global Fansy Oy tarjoaa sinulle k??ytt????n henkil??kohtaisen,
                      ei siirto-oikeudellisen ja ei yksinomaisen oikeuden ja/tai
                      lisenssin k??ytt??koodimme tai ohjelmistomme k??ytt????n
                      laitteellasi, niin kauan kun et salli kenenk????n kolmannen
                      osapuolen kopioida, muuttaa, muokata, tuottaa tai
                      plagioida sis??lt???? palveluun tai palvelusta,
                      takaisinmallintaa tai muulla tavalla yritt???? p????st??
                      perille l??hdekoodeistamme, myyd??, alilisensoida, sallia
                      tietoturvaa vaarantavaa toimintaa ja/tai vastaavalla
                      tavalla siirt???? t??t?? oikeutta ohjelmistoon muille. Lis??ksi
                      sitoudut itse olla muuttamatta tai muokkaamatta
                      ohjelmistoa mitenk????n, ja pit??yty?? k??ytt??m??st?? muutettuja
                      tai muokattuja ohjelmiston versioita. T??h??n sis??ltyy
                      ehdottomasti yritys k??ytt???? palvelujamme ilman
                      k??ytt??oikeutta. Lopuksi pit??ydyt k??ytt??m??st?? tai
                      yrityksest?? k??ytt???? palvelujamme mitenk????n muuten kuin
                      Global Fansy Oy:n tarjoaman k??ytt??liittym??n kautta.
                      <h4 className="pt-5 font-xsss ">
                        17. VASTUUVAPAUTUSLAUSEKE
                      </h4>
                      Kaikkien yksityishenkil??iden ja yritysten, jotka k??ytt??v??t
                      Global Fansy Oy:n sovelluksia tai palveluita oletetaan
                      lukeneen ja hyv??ksyneen seuraavat ehdot: Global Fansy Oy:n
                      tarjoamien palveluiden ja alustan sek?? aplikaatioiden
                      k??ytt?? on t??ysin omalla vastuullasi. Kaikki edell??mainitut
                      tarjotaan k??ytt????n sellaisena kuin ne ovat saatavilla.
                      <br />
                      Global Fansy Oy ja yhteisty??tahomme, ty??ntekij??mme ja
                      kaikki sidosryhm??mme sek?? lisensoijamme ovat vapaita
                      vastuista, jotka liittyv??t sis??ll??n k??ytt??oikeuksiin, sen
                      kaupallistamiseen, soveltumiseen suunniteltuun
                      k??ytt??tarkoitukseen ja tekij??noikeuksien rikkomiseen. Emme
                      my??sk????n vastaa siit??, ett?? palvelut ja alusta vastaa
                      vaatimuksiasi. Tai toimisivat t??ysin ilman keskeytyksi??,
                      olisivat ajantasaisia, turvallisia tai virheett??mi??. Ett??
                      lopputulokset palveluiden ja/tai alustan k??yt??st?? olisivat
                      paikkansapit??vi?? tai luotettavia.
                      <br />
                      Emmek?? vastaa mink????n tuotteen, palvelun, informaation tai
                      muun materiaalin laadusta, joka on ostettu tai muutoin
                      saatu haltuun alustamme tai tarjoamamme palvelun kautta.
                      Tai ett?? ne t??ytt??isiv??t odotuksesi ja ett?? mik?? tahansa
                      t??llainen virhe ohjelmistossamme ja/tai alustassamme
                      korjattaisiin. Mink?? tahansa materiaalin tai informaation
                      lataaminen tai muuten haltuun saaminen Global Fansy Oy:n
                      alustoilta tai palveluista on t??ysin omalla harkinnallasi
                      tapahtuvaa sek?? omalla vastuullasi, ja siten olet sen
                      aiheuttamasta mahdollisesta vahingosta tai haitasta
                      vastuussa itse.
                      <br />
                      Mink????n neuvon tai tiedon saaminen kirjallisesti tai
                      suullisesti, jonka saat Global Fansy Oy:lt?? ei tuo lis????
                      vastuita yhti??lle k??ytt??ehtosopimuksessa kirjatun lis??ksi.
                      <h4 className="pt-5 font-xsss ">18. VASTUUNRAJOITUS</h4>
                      Kaikkien yksityishenkil??iden ja yritysten, jotka k??ytt??v??t
                      Global Fansy Oy:n sovelluksia tai palveluita, oletetaan
                      lukeneen ja hyv??ksyneen seuraavat ehdot: Global Fansy Oy
                      ja yhteisty??tahomme, alihankkijamme, ty??ntekij??mme ja
                      kaikki sidosryhm??mme sek?? lisensoijamme eiv??t ole
                      vastuussa mist????n vahingoista joita mahdollisesti aiheutuu
                      kuten tulonmenetykset, mainehaitat, tiedon ja muun siihen
                      verrattavan menett??minen seuraavista syist??: Palvelun
                      k??ytt?? tai sen katkot, Korvaavien tuotteiden ja
                      palveluiden hankkimisesta aiheutuneen kustannukset,
                      Tietojesi tai materiaaliesi luvaton k??ytt?? tai
                      muuttaminen, Mik?? tahansa kolmannen osapuolen toiminta
                      palvelussamme, Tai mik?? tahansa muu asia mik?? koskee
                      palveluamme.
                      <h4 className="pt-5 font-xsss ">
                        19. VAROITUS TALOUDELLISIIN SEIKKOIHIN LIITTYEN
                      </h4>
                      Jos k??ytt??j?? vastaanottaa tai pyyt???? uutisia, viestej??,
                      tai muuta informaatiota palvelussamme, joka koskee
                      yhti??it??, osakkeita, tarjouksia, sijoituksia tai
                      vakuuksia, pyyd??mme lukemaan edell?? listatut
                      vastuuvapauslausekkeet ja vastuun rajoitukset uudelleen.
                      Global Fansy Oy:n sis??ll??t on tarkoitettu ensisijaisesti
                      tiedonjaon tarkoituksiin, ja osakekauppaan ja
                      investointiin tarkoitetut palvelut eiv??t ole
                      ensisijaisesti meid??n palvelujamme. Global Fansy Oy ja
                      lisensoijamme eiv??t ole vastuussa palvelumme kautta
                      jaetusta edell?? mainittuja aloja koskevasta tiedosta, tai
                      sen paikkaansa pit??vyydest??, k??ytt??kelpoisuudesta tai
                      saatavuudesta ja ei ole siten vastuussa mist????n
                      osakekaupan tai sijoittamisen p????t??ksist??, joka pohjaa
                      t??h??n tietoon.
                      <h4 className="pt-5 font-xsss ">
                        20. TAKUIDEN POISSULKEMINEN JA RAJOITUKSET
                      </h4>
                      Pakottava lains????d??nt?? ei salli kaikissa tapauksissa
                      nimenomaisen tai ep??suoran takuun poissulkemista tai
                      rajoittamista. Siten kaikki vastuuvapauslausekkeet eiv??t
                      mahdollisesti koske kaikkia.
                      <h4 className="pt-5 font-xsss ">
                        21. KOLMANNET OSAPUOLET
                      </h4>
                      Tiedostat, ymm??rr??t ja hyv??ksyt, ett?? ellei
                      K??ytt??ehtosopimuksessa ole erikseen asiasta toisin
                      mainittu, t??h??n sopimukseen liittyy kolmansia osapuolia
                      edunsaajana.
                      <h4 className="pt-5 font-xsss ">22. TIEDOTUS</h4>
                      Global Fansy Oy saattaa l??hett???? sinulle tiedonantoja,
                      my??s liittyen muutoksiin K??ytt??ehtosopimukseen. N??it??
                      voidaan l??hett???? s??hk??postin, kirjepostin, MMS tai SMS
                      muodossa, tekstiviestin??, viestein?? palvelun kautta tai
                      muulla k??ytt??kelpoisella olemassa olevalla tavalla tai
                      tulevassa kehitetyll?? tavalla. Saatat j????d?? ilman n??it??
                      tiedotuksia, mik??li k??ytt????si on rajoitettu
                      K??ytt??sopimusehtojen m????ritt??m??n tavan vastaisen toiminnan
                      takia. T??ten hyv??ksyt, ett?? t??llaisessa tapauksessa
                      saamatta j????nyt tiedotus johtuu sopimuksen vastaisesta
                      toiminnasta ja siten kaikkien tiedotusten saaminen on
                      sinun vastuullasi.
                      <h4 className="pt-5 font-xsss ">
                        23. TAVARAMERKKEJ?? JA TEKIJ??NOIKEUKSIA VASTAAN
                        RIKKOMISESTA ILMOITTAMINEN
                      </h4>
                      Global Fannsy Oy noudattaa tavaramerkki,- ja
                      tekij??noikeuslakeja ja k??ytt??jiemme tulee tehd?? samoin.
                      Yhti?? voi yksipuolisella p????t??ksell????n est???? tai lopettaa
                      k??ytt??j??tilej??, joissa toistuvasti rikotaan n??it?? lakeja
                      vastaan. Jos ep??ilet, ett?? omia t??it??si tai muiden t??it??
                      on kopioitu tekij??noikeuksien takaaman suojan vastaisesti,
                      tulee sinun toimittaa seuraavat tiedot:
                      <br />
                      - Kuvaus/selvitys ty??st??, jonka tekij??noikeuksia ep??ilet
                      rikotun;
                      <br />
                      - Selvitys tilist?? jossa t??m?? ep??ilty rikkomus on
                      tapahtunut;
                      <br />
                      - Kotiosoitteesi, puhelinnumerosi ja s??hk??postiosoitteesi;
                      <br />
                      - Lausunto, jossa kerrotaan, ett?? v??itetyn ja
                      kiistanalaisen ty??n k??ytt?? ei ole ollut sallittua
                      tekij??noikeuden haltijan, h??nen edustajansa tai lain
                      puolesta;
                      <br />
                      - Lopuksi lausunto, jossa vakuutat rangaistuksen uhalla,
                      ett?? edell?? annettu tieto on totuudenmukaista, ett?? olet
                      tekij??noikeuksien haltija, tai niiden haltijan edustaja ja
                      toimit h??nen suostumuksellaan.
                      <br />
                      Ilmoituksen voit tehd?? s??hk??postilla osoitteeseen
                      info@globalfansy.com
                      <br />
                      <b>YLEIST?? TIETOA</b>
                      <h4 className="pt-5 font-xsss ">
                        24. KAIKENKATTAVA SOPIMUS
                      </h4>
                      T??m?? k??ytt??ehtosopimus muodostaa kaikenkattavan sopimuksen
                      sinun ja Global Fansy Oy:n v??lille, ja koskee
                      palveluidemme k??ytt????. T??m?? sopimus korvaa kaikki
                      mahdolliset aikaisemmat tehdyt k??ytt??ehtosopimukset.
                      Saatat joutua sopimaan lis??ehdoista, jos ostat Gobal Fansy
                      Oy:n joitakin palvelua, yhteisty??kumppaniemme palveluja
                      tai kolmansien osapuolien palveluja tai ohjelmistoja.
                      <h4 className="pt-5 font-xsss ">25. SOVELLETTAVA LAKI</h4>
                      T??ss?? k??ytt??ehtosopimuksessa m????ritet????n, ett??
                      sopimuksessa k??ytetty lains????d??nt?? on Suomen lakeihin
                      perustuva. Mahdolliset oikeudenk??ynnit ja muut kiistat
                      hoidetaan Suomen oikeuslaitoksen toimesta.
                      <h4 className="pt-5 font-xsss ">
                        26. VAATEISTA LUOPUMINEN/EHTOJEN ERILLISYYS
                      </h4>
                      Jos kumpi tahansa osapuoli luopuu t??m??n sopimuksen
                      rikkomista koskevasta vaateesta tai siihen perustuvasta
                      oikeudesta, luopuminen ei merkitse luopumista mist????n
                      my??hemm??st?? vaateesta tai oikeudesta. Jos toimivaltainen
                      tuomioistuin toteaa mink?? tahansa t??m??n sopimuksen
                      m????r??yksen p??tem??tt??m??ksi tai t??yt??nt????npanokelvottomaksi,
                      t??llainen m????r??ys erotetaan sopimuksen muusta sis??ll??st??,
                      joka pysyy t??ysin voimassa.
                      <h4 className="pt-5 font-xsss ">
                        27. TILIN PERINT??OIKEUDESTA
                      </h4>
                      Tiedostat, ymm??rr??t ja hyv??ksyt, ett?? k??ytt??j??tilisi ei
                      ole kuolemantapauksen sattuessa peritt??viss?? tai
                      siirrett??viss?? perillisillesi tai muille osapuolille ja
                      tili lopetetaan. Kuolintodistus tulee toimittaa Global
                      Fansy Oy:lle ja tilin lopettamisen lis??ksi kaikki sis??lt??
                      poistetaan pysyv??sti.
                      <h4 className="pt-5 font-xsss ">28. VANHENTUMISS????NT??</h4>
                      Tiedostat, ymm??rr??t ja hyv??ksyt, ett?? riippumatta mist??
                      tahansa vastakohtaisesta lainkohdasta, kaikki kanteet ja
                      valitukset palvelun k??ytt????mme tai k??ytt??ehtosopimukseen
                      liittyen tulee esitt???? yhden (1) vuoden kuluessa
                      tapahtuneesta, Sen j??lkeen se on vanhentunut.
                      <h4 className="pt-5 font-xsss ">RIKKOMUKSET</h4>
                      Yhteystiedot ilmoittamisesta rikkomuksista
                      k??ytt??ehtosopimusta vastaan: info@globalfansy.com

                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Popupchat />
        <Appfooter />
      </Fragment>
    );
  }
}

export default ShopOne;
