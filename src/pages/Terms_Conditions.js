import React, { Component, Fragment } from "react";
import Header from "../components/Header";
import Leftnav from "../components/Leftnav";
import Rightchat from "../components/Rightchat";
import Appfooter from "../components/Appfooter";
import Popupchat from "../components/Popupchat";
import t1 from "../../public/assets/images/team/t1.png";
import t2 from "../../public/assets/images/team/t2.png";
import t3 from "../../public/assets/images/team/t3.png";
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
                        Kaikkien yksityishenkilöiden ja yritysten, jotka
                        käyttävät Global Fansy Oy:n sovelluksia tai palveluita
                        oletetaan lukeneen ja hyväksyneen seuraavat käyttöehdot.
                        Jos et hyväksy ehtoja pyydämme olemaan käyttämättä
                        sovelluksiamme ja palveluitamme sekä sivustojamme. Tämä
                        sopimus on voimassa 5/12/2021 lähtie
                        <br></br>
                        <br></br>
                        Miksi keräämme tietoja ja minkä vuoksi sopimusehdot on
                        hyväksyttävä:
                        <br></br>
                        Verkkosivustomme osoite on: https://www.globalfansy.com
                        ja https://www.globalfansy.fi ja digimarkkinoinnin
                        sivustomme Facebookissa sekä Instagramissa. Tämä on
                        Global Fansy Oy:n henkilötietolain (10 ja 24 §) ja EU:n
                        yleisen GDPR-asetusten mukainen rekisteri- ja
                        tietosuojaseloste. Laadittu 15.11.2021 ja päivitetty
                        5.12.2021.
                        <br></br>
                        <br></br>
                        Käyttötarkoitus on ylläpitää asiakas- ja
                        markkinointirekisteriä, antaa sisällöntuottajien
                        käyttöön Global Fansyn alusta joihin rekisteröinti
                        tietoja tarvitaan sekä verkkopalvelun
                        käyttäjärekisteriä. Sisällöntuottaja luo
                        henkilökohtaisesti tilin Stripe maksunvälittäjän kanssa.
                        Rekisterin ylläpitäjä on Global Fansy Oy (Y-tunnus
                        3223630-9), Tanja Kauriinoja, tanja (@) globalfansy.com.
                        <br></br>
                        <br></br>
                        Yksityisyyden suojaaminen on Global Fansy Oy:lle
                        erittäin tärkeää. Jotta voimme tarjota asiakkaillemme
                        palveluita, tehdä viestintää ja markkinointia, meidän on
                        välttämätön käsitellä asiakasrekisterin tietoja. Pyrimme
                        käsittelemään kaikkea meille annettuja tietoja
                        vastuullisesti, tietoturvallisesti ja läpinäkyvästi.
                        Varaamme oikeuden päivittää näitä evästekäytäntöjä
                        palveluiden kehityksen taikka lainsäädännön tai
                        viranomaissuositusten muuttumisen vuoksi. Keräämämme
                        tiedot ovat henkilön nimi, yritys/organisaatio
                        (Y-tunnus), yhteystiedot, verkkosivujemme
                        yhteydenottolomakkeen tiedot, www-sivustojen osoitteet,
                        IP-osoite, sosiaalisen median käyttäjäprofiilin julkiset
                        tiedot, tarjouksiin ja sopimukseen liittyvät
                        palvelukuvaukset, laskutustiedot, asiakassuhteen
                        hoitamisen kannalta olennaiset ja välttämättömimmät
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
                        <b>Sähköposti: info@globalfansy.com</b> <br />
                        <b>Numero: +358 45 800 8020</b>
                        <br />
                        <b>Yhteyshenkilö: Tanja Kauriinoja, toimitusjohtaja</b>
                        <br />
                        <h4 className="pt-5 font-xsss ">
                          1. KÄYTTÖEHTOJEN HYVÄKSYMINEN
                        </h4>
                        Seuraavassa kirjattu Palvelun Käyttöehtosopimus on
                        laillisesti sitova sopimus, joka kattaa käyttäjiemme ja
                        muiden palvelun kanssa vuorovaikutuksessa olevien
                        välisen suhteen Rovaniemellä, Suomessa sijaitsevan
                        Global Fansy Oy:n ja yhteistyötahojemme kanssa. Sopimus
                        kattaa kaikki Global Fansy Oy:n tarjoamat palvelut
                        internetalustalla, eli verkkosivuston palveluineen sekä
                        mobiilisovelluksen, joiden sisällön kuvaus sisältyy
                        sopimukseen.
                        <br />
                        <h4 className="pt-5 font-xsss ">
                          2. GLOBAL FANSY Oy:n VERKKOALUSTAN PALVELUKUVAUS
                        </h4>
                        Tämä verkkoalusta on yhteisöllinen verkostoitumispalvelu
                        internetissä jossa on mahdollisuus myös digitaaliseen
                        markkinointiin, palvelujen myyntiin ja tuottamiseen.
                        Näitä ovat esimerkiksi sosiaalisen median
                        sisällöntuotanto, verkkokurssit suoratoistopalveluna tai
                        muussa digitaalisessa muodossa, konsertit, digitaaliset
                        näyttelyt, mahdollisuus tuotteiden verkkokauppaan ja
                        niin edelleen, kaikki samalla verkkoalustalla. Sivuston
                        kuvaus on seuraavanlainen;
                        <br />
                        <br />
                        Global Fansy on yhteisöllinen verkostoitumispalvelu
                        internetissä tapahtuma-alustalla. Se on rakennettu
                        antamaan digitaalisen sisällöntuottajille, esiintyjille,
                        luennoitsijoille ja kouluttajille mahdollisuus julkaista
                        valokuva-, dokumentti- ja videosisältöä, sekä
                        suoratoistopalvelusisältöä, täten mahdollistaen
                        tuotteistaa sisältönsä ja mahdollisuuden rahan
                        ansaitsemiseen käyttäjien maksaessa maksullisen sisällön
                        katsomisesta ja/tai tilaamisesta. Verkkosivusto ja
                        mobiilisovellus tekee käyttäjälle helpoksi nauttia
                        striimatuista livetapahtumista, kokouksista ja
                        kokoontumisista, konserteista ja toisten ihmisten
                        tapaamisesta ja vuorovaikutuksesta verkossa. Tapahtumien
                        / palvelujen / tuotteiden digitaalinen markkinointi on
                        yksinkertaista ja tehokasta palvelussa. Global Fansy
                        Oy:llä on myös mahdollisuus markkinoida valitsemiensa
                        asiakkaidensa tapahtumia / palveluja / tuotteita.
                        <br />
                        Kaikki palveluun rekisteröityneet luetaan
                        palvelunkäyttäjiksi ja siten ovat tämän
                        käyttöehtosopimuksen ehtojen piirissä.
                        <br />
                        Käyttäjä tiedostaa ja hyväksyy, että kaikki olemassa
                        olevat palvelut verkkosivulla ja sovelluksessa ovat
                        Global Fansy Oy:n omaisuutta. Palveluun kuuluvia
                        sovelluksia saatetaan jakaa erilaisilla verkkoalustoilla
                        ja sosiaalisessa mediassa. Global Fansy Oy voi käyttää
                        mahdollisuutta tarjota muita verkkopalveluita ja/tai
                        tuotteita, tai päivittää, muokata tai muuttaa mitä
                        tahansa olemassa olevaa sisältöä ja palvelua, ja tämä
                        sopimus kattaa näin tapahtuessa kaikki nämä vaihtoehdot,
                        mikäli ei toisin ilmoiteta. Global Fansy Oy pidättää
                        oikeuden perua ja lopettaa kaikki edellä mainitut
                        palvelut ja/tai tuotteet. Käyttäjänä tiedostat ja
                        hyväksyt Global Fansyn vastuuvapauden edellä mainituissa
                        tilanteissa. Global Fansyn käyttäjänä jatkaminen edellä
                        mainituissa tilanteissa katsotaan niiden hyväksymiseksi.
                        Tämän käyttöehtosopimuksen säännöllinen lukeminen on
                        siksi suositeltavaa ajantasaisen sopimussisällön
                        ymmärtämiseksi. Jos edellä mainitun kaltaisten
                        mahdollisten muutosten takia et voi enää hyväksyä
                        sopimuksen sisältöä, tulee palvelun käyttö lopettaa.{" "}
                        <br />
                        <br />
                        Lisäksi käyttäjä ymmärtää ja hyväksyy sen, että palvelut
                        tarjotaan sellaisena kuin ne ovat ja siten Global Fansy
                        Oy ei ole vastuullinen tai velvollinen tilanteissa,
                        kuten toimitusvaikeuksien, sisällön, kommunikaation tai
                        tallennusvirheiden takia. Global Fansy Oy veloittaa 20%
                        + alv kaikista palveluidemme kautta tapahtuvista
                        myynneistä.
                        <h4 className="pt-5 font-xsss ">
                          3. REKISTERÖITYMINEN
                        </h4>
                        Käyttäjän tulee olla 18 vuotta vanha (täysi-ikäinen)
                        rekisteröityäkseen palveluun ja solmiakseen
                        lainvoimaisen sopimuksen, ja täten pystyäkseen
                        käyttämään palvelussa tarjolla olevaa maksullista
                        sisältöä. Ala-ikäisten jäsenyyteen tarvitaan huoltajan
                        suostumus. Alaikäisen tulee kuitenkin olla vähintään 15
                        vuotta vanha. Sinun tulee olla oikeustoimikelpoinen,
                        eikä sinulta ole aikaisemmin evätty jäsenyyttä Global
                        Fansy Oy:n palveluissa Suomen lain tai sen asetusten
                        rikkomisen takia. Rekisteröityvä osapuoli ymmärtää ja
                        hyväksyy että:
                        <br />
                        - tietojen keräys- ja rekisteröintiprosessissa antaa
                        vain todenmukaisia, oikeita ja täydellisiä tietoja
                        itsestään kuten niitä pyydetään; - Ja ylläpitää ja
                        päivittää tarvittaessa henkilökohtaiset tietonsa
                        ajantasaisuuden ja täydellisyyden saavuttamiseksi.
                        <br />
                        Jos joku tietoisesti antaa väärää, valheellista,
                        virheellistä tai epätarkkaa tietoa itsestään, on tämä
                        Global Fansy Oy:lle riittävä syy ja oikeus pidättää
                        nykyinen käyttöoikeus palveluihin tai lopettaa se, kuin
                        myös olla myöntämättä käyttöoikeutta
                        tulevaisuudessakaan.
                        <br />
                        Global Fansy Oy:n prioriteetti on taata käyttäjiensä
                        turvallisuus ja yksityisyys, erityisesti
                        alaikäisten/lasten. Tästä syystä alaikäisten/lasten
                        vanhempien tai huoltajien, jotka sallivat heidän käyttää
                        Global Fansy Oy:n palveluita, on kannettava kaikki
                        vastuu verkkosivun ja sovelluksen palvelujen sisällöstä
                        ja sen sopivuudesta huollettavalleen. Lisäksi Global
                        Fansy Oy ei ole vastuuussa palvelujen epäsoveliaasta
                        käytöstä, rahallinen käyttö mukaan lukien, käyttäjien
                        toimesta, jotka eivät kykene ymmärtämään tämän
                        käyttöehtosopimuksen sisältöä.
                        <h4 className="pt-5 font-xsss ">
                          4. YKSITYISYYDEN SUOJA
                        </h4>
                        Global Fansy Oy suojaa tarkasti kaikkien käyttäjien
                        rekisteröitymisessä annettuja ja muita henkilökohtaisia
                        tietoja, kuten Global Fansy Oy:n Tietosuoja,- ja
                        Rekisteriselosteessa on mainittu (linkki siihen).
                        Käyttäjänä annat luvan tietojen keräämiseen ja niiden
                        käyttöön, mukaan lukien tietojen siirtoon Euroopan
                        Unionin ja muiden maiden sisällä varastoinnin,
                        prosessoinnin tai Global Fansy Oy:n ja sen
                        yhteistyökumppanien käyttötarkoituksien takia.
                        <h4 className="pt-5 font-xsss ">
                          5. KÄYTTÄJÄTILI, KÄYTTÄJÄNIMI, SALASANA JA
                          KÄYTTÖTURVALLISUUS
                        </h4>
                        Kun olet rekisteröitynyt ja luonut käyttäjätilin,
                        käyttäjänimen sekä salasanan, saat vahvistussähköpostin
                        ja tilisi avataan. Olet itse vastuullinen salasanasi
                        salassapidosta ja luotettavuudesta, ja kaikista
                        tililläsi nimelläsi tapahtuvista tapahtumista ja
                        toimista. Jos huomaat, että tilillesi kirjaudutaan tai
                        käytetään sitä luvattomasti, tai epäilet salasanasi
                        joutuneen toiselle henkilölle tai muuta
                        epäluotettavuutta, on velvollisuutesi ilmoittaa tästä
                        Global Fansy Oy:lle. Edellä kuvatun kaltaisessa
                        tilanteessa Global Fansy Oy ei ole vastuullinen
                        mahdollisista menetyksistä ja/tai haitoista, joita tästä
                        aiheutuu.
                        <h4 className="pt-5 font-xsss ">6. KÄYTÄNTÖÖNPANO</h4>
                        Sivuston ja sovelluksen käyttäjänä tiedostat, ymmärrät
                        ja hyväksyt sen, että kaikki informaatio, teksti,
                        ohjelmisto, tieto, valokuvat, musiikki, videot, viestit,
                        suoratoistot ja merkinnät tai muu sisältö, on se sitten
                        julkisesti tai yksityisesti tuotettua ja/tai jaettua, on
                        ainoastaan sen tekijän ja/tai jakajan vastuulla. Olet
                        vastuussa kaikesta tuottamastasi, jakamastasi,
                        lataamastasi, viestimästäsi, siirtämästäsi tai muulla
                        tavalla Global Fansy Oy:n kautta esille tuomastasi
                        sisällöstä. Siten Global Fansy Oy ei ole vastuussa
                        käyttäjien tekemän ja/tai jakaman ja palvelussa
                        julkaistun sisällön paikkaansapitävyydestä,
                        todenperäisyydestä, oikeellisuudesta, rehellisyydestä
                        tai laadusta. Käyttämällä palvelua ymmärrät ja sitoudut,
                        että voit altistua kaikenlaiselle sisällölle ja Global
                        Fansy Oy ei ole vastuullinen haitasta tai tappiosta,
                        jota sen palveluissa edellä mainituin tavoin jaettu ja
                        tuotettu sisältö mahdollisesti voi aiheuttaa.
                        <br />
                        Lisäksi sitoudut olla käyttämättä Global Fansy Oy:n
                        alustaa seuraaviin tarkoituksiin: - ladata, julkaista,
                        lähettää yksityisviesteillä, siirtää, suoratoistaa tai
                        jakaa muulla tavalla alustan kautta sisältöä, joka on
                        laitonta, haitallista, vaarallista, hyväksikäyttävää,
                        ahdistelevaa, kiduttavaa, herjaavaa, vulgääriä,
                        hävytöntä, loukkaavaa, yksityisyyttä uhkaavaa, tai vihaa
                        lietsovaa rotua, etnisyyttä ja/tai muulla tavalla
                        vastustettavaa; - alaikäisiä millään tavalla
                        vahingoittavaa;
                        <br />
                        - esiintyä jonain toisena yksilönä tai ryhmänä, mukaan
                        lukien kaikki Global Fansy Oy:n edustajat, foorumien
                        johtajat, ohjaajat ja isännät/emännät tai valheellisesti
                        esittää yhteys / edustus johonkin yksilöön tai ryhmään.
                        <br />
                        - väärentää otsikoita, nimikkeitä tai julkaisujen nimiä
                        tai muulla tavalla tarjota sisältöä, johon sinulla ei
                        ole lainmukaista oikeutta tai sopimus- tai
                        luottamusoikeutta; - ladata, julkaista, lähettää
                        yksityisviestillä, siirtää, suoratoistaa tai jakaa
                        muulla tavalla alustan kautta sisältöä, joka rikkoo
                        patentti-, copyright-, trademark tai muuta tekijän- tai
                        omistusoikeutta rikkovaa sisältöä;
                        <br />
                        - ladata, julkaista, lähettää yksityisviestillä,
                        siirtää, suoratoistaa tai jakaa muulla tavalla alustan
                        kautta sisältöä, johon sinulla henkilökohtaisesti ei ole
                        lain tuomia oikeuksia, tai tekijänoikeussuojattua
                        sisältöä;
                        <br />
                        - ladata, julkaista, lähettää yksityisviestillä,
                        siirtää, suoratoistaa tai jakaa muulla tavalla alustan
                        kautta sisältöä, joka on oikeudetonta tai luvatonta
                        mainontaa, markkinointia, roskapostia tai spämmiä, tai
                        muuta myynnin tai muun sellaisen edistämistä, muuta kuin
                        alustan tarkoitukseen osoittamilla alueilla;
                        <br />
                        - ladata, julkaista, lähettää yksityisviestillä,
                        siirtää, suoratoistaa tai jakaa muulla tavalla alustan
                        kautta sisältöä, joka voi sisältää virusohjelmistoja,
                        haittaohjelmistoja, tiedonkalasteluohjelmistoja,
                        tietokonekoodia, tiedostoja ja/tai muita ohjelmia, jotka
                        on tehty haittaaaman, tuhoamaan ja/tai rajoittamaan
                        minkä tahansa tietokoneohjelmiston, kovalevyn tai
                        tietoliikenneyhteyksien laitteiden toimintaa;
                        <br />
                        - häiriköidä keskustelun ja kommunikaation normaalia
                        kulkua tai muutoin käyttäytyä tavalla, joka vaikuttaa
                        negatiivisesti muiden käyttäjien mahdollisuuksiin
                        osallistua reaaliaikaiseen kanssakäymiseen;
                        <br />
                        - puuttua tai häiriköidä mitä tahansa Global Fansy Oy:n
                        tarjoamaa palvelua, serveriä ja/tai verkostoa, joka on
                        yhteydessä tai liityksissä verkkoalustaamme. Tämä
                        sisältää, muttei ole rajoitettu koskemaan mitä tahansa
                        laiteohjelmistoa ja/tai käyttötapaa ohittamaan
                        robottitunnisteiden toimintaa
                        <br />
                        - rikkoa kansallista tai kansainvälistä lakia
                        tarkoituksella tai vahingossa;
                        <br />
                        - käyttää Global Fansy Oy:n tarjoamaa alustaa alustana
                        ja levittää kiihotusta kansanryhmää kohtaan, kuten
                        rodun, etnisyyden tai uskonnollisen vakaumuksen takia;
                        <br />
                        - käyttää Global Fansy Oy:n alustaa
                        rahanpesutarkoitukseen;
                        <br />
                        - jakaa sisältöä tai tukea, peittää ja/naamioida
                        henkilö, paikka tai lähde, joka on liitoksissa
                        terroristiorganisaatioihin tai muuten tuottaa sisältöä
                        terroristisessa tarkoituksessa;
                        <br />
                        - jatkuvasti vakoilla tai muussa tarkoituksessa
                        häiriköidä toista käyttäjää;
                        <br />
                        - kerätä tai tallentaa mitään henkilökohtaista tietoa
                        muusta käyttäjästä tavalla joka on kuvattu ja kielletty
                        aikaisemmissa kappaleissa.
                        <br />
                        - ladata, julkaista, lähettää yksityisviestillä,
                        siirtää, suoratoistaa tai jakaa muulla tavalla alustan
                        kautta sisältöä joka luokitellaan aikuisviihteeksi.
                        <br />
                        Global Fansy Oy pidättää edellä mainittuun vedoten
                        oikeuden esikatsella, kieltäytyä ja/tai poistaa mitä
                        tahansa olemassa olevaa sisältöä alustaltaan. Lisäksi
                        pidätämme oikeuden poistaa ja tuhota mitä tahansa
                        sisältöä, joka on käyttöehtojen vastaista tai voisi
                        muulla tavalla olla loukkaavaa käyttäjille.
                        <br />
                        Global Fansy pidättää oikeuden päästä käsiksi, säilyttää
                        ja/tai sulkea käyttäjätilin tiedot ja/tai sisällön, jos
                        sitä velvoitetaan lain toimesta tai uskoen tämän toimen
                        olevan kohtuullisen välttämätöntä seuraavista syistä:
                        <br />
                        - minkä tahansa lain vaatiman toimenpiteen takia;
                        <br />
                        - käyttöehtojen käytäntöönpanoa varten;
                        <br />
                        - vastatakseen mihin tahansa kolmannen osapuolen
                        esittämään vaateeseen koskien käyttöoikeuksien
                        rikkomista;
                        <br />
                        - vastatakseen asiakaspalvelun kautta tulleisiin
                        pyyntöihin;
                        <br />
                        - suojatakseen Global Fansy Oy:n ja sen tarjoaman alusta
                        käyttäjien oikeuksia, omaisuutta ja henkilökohtaista
                        turvallisuutta, mukaan lukien suuri yleisö.
                        <br />
                        Global Fansy Oy täten pidättää oikeuden käyttää
                        turvallisuustoimia tarpeen vaatiessa varmistamaan, että
                        digitaalinen informaatio tai materiaali on suojattua ja
                        että niiden käyttö on Global Fansy Oy:n määrittelemien
                        käyttöehtojen mukaista. Siten kaikki yritykset kiertää
                        tai rikkoa näitä ehtoja on kiellettyä. Lisäksi luvaton
                        kopiointi, julkaisu, jakaminen tai näytteillepano
                        alustallamme julkaistusta materiaalista, tehdään se joko
                        sellaisenaan tai osittain, on kielletty.
                        <h4 className="pt-5 font-xsss ">
                          7. YHTIÖN PALVELUIHIN TUOTETUSTA TAI JULKAISTUSTA
                          SISÄLLÖSTÄ
                        </h4>
                        Global Fansy Oy ei varaa omistusoikeutta mihinkään
                        käyttäjän alustalla tuottamaan ja julkaisemaan
                        sisältöön, tai käytä sitä omanaan
                        verkkosivupalveluissaan. Siten hyväksyt ja annat Global
                        Fansy Oy:lle alla listatut maailmanlaajuiset,
                        tekijänpalkkiovapaat ja kaikenkattavat lisenssit
                        käyttöön soveltuvin osin:
                        <br />
                        - Lisenssi sisältöön, joka on julkaistu tai tuotettu
                        julkisilla alueilla Global Fansy Oy:n alustalla, antaa
                        luvan käyttää, jakaa, kopioda, muokata, soveltaa,
                        julkisesti esittää ja/tai näyttää mainittua sisältöä,
                        ainoana tarkoituksena markkinoida alustaa, jonne sisältö
                        on julkaistu ja/tai tuotettu. Tämä lisenssi on voimassa
                        niin kauan kuin olet Global Fansy Oy:n palvelujen
                        käyttäjä ja sen voimassaolo loppuu jos valitset luopua
                        jäsenyydestä.
                        <br />
                        - Lisenssi kuviin, äänitiedostoihin, videoihin ja/tai
                        grafiseen sisältöön, joka on julkaistu tai tuotettu
                        julkisilla alueilla Global Fansy Oy:n alustalla, antaa
                        luvan käyttää, jakaa, kopioida, muokata, soveltaa,
                        julkisesti esittää ja/tai näyttää mainittua sisältöä,
                        ainoana tarkoituksena markkinoida alustaa, jonne sisältö
                        on julkaistu ja/tai tuotettu. Tämä lisenssi on voimassa
                        niin kauan kuin olet Global Fansyn palvelujen käyttäjä
                        ja sen voimassaolo loppuu jos valitset luopua
                        jäsenyydestä.
                        <br />
                        - Kaikki muut sisältö, joka on julkaistu ja/tai tuotettu
                        julkisilla alueilla Global Fansy Oy:n alustalla, ovat
                        jatkuvan, sitovan ja täysin alilisentoivan lisenssin
                        alla, joka tarkoittaa lupaa käyttää, jakaa, kopioida,
                        muokata, soveltaa, julkaista, kääntää, julkisesti
                        esittää ja/tai näyttää mainittua sisältöä, joko
                        kokonaisuudessaan tai osia siitä, ja lupaa mainitun
                        matariaalin sisällyttämisestä osana toista missä tahansa
                        olemassa olevalla alustalla tai mediassa tai myöhemmin
                        kehitettävällä.
                        <br />
                        Alueet, jotka ovat määritelty julkisesti saatavilla
                        oleviksi Global Fansy Oy:n sivustolla ja sovelluksessa,
                        ovat niitä, joihin on pääsy rekisteröityneellä
                        käyttäjällä, sisältäen foorumit, viestimet ja ryhmät,
                        jotka ovat tarkoitettuja käyttäjille.
                     
                      <h4 className="pt-5 font-xsss ">
                        8. KEHITYSEHDOTUKSET YHTIÖN PALVELUN TOIMINTAAN
                      </h4>
                      <br />
                      Global Fansy Oy tarjoaa käyttäjilleen mahdollisuuden
                      kehitysehdotuksiin verkko palveluistamme. Kun lähetät
                      ideoita, dokumentteja ja ehdotuksia sivustostamme,
                      tiedostat ja hyväksyt että:
                      <br />
                      - ne eivät sisällä mitään salassapitovelvollisuuden tai
                      omistusoikeuden alaista tietoa;
                      <br />
                      - Global Fansy Oy ei ole vastuullinen tai velvoitettu
                      takaamaan tai säilyttämään tiedossa olevaa tai oletettua
                      salassapitoa mihinkään näihin edellä mainittuihin
                      liittyen;
                      <br />
                      - Global Fansy Oy on oikeutettu käyttämään tai olla
                      käyttämättä edellä listattuja parhaaksi katsomallaan
                      tavalla;
                      <br />
                      - edellä listatuista kehitysehdotuksista tulee
                      automaattisesti Global Fansy Oy:n omaisuutta;
                      <br />
                      - Global Fansy Oy:llä ei ole velvollisuutta maksaa tai
                      korvata millään tavalla edellä listatuista
                      kehitysehdotuksista.
                      <br />
                      <h4 className="pt-5 font-xsss ">9. VASTUUVAPAUS</h4>
                      Kaikkien käyttäjien tulee huolehtia että Global Fansy
                      Oy:n, yhteistyökumppanimme ja sidosryhmämme,
                      työntekijämme, toimijamme ja/tai lisensoijamme säilyvät
                      syyttöminä tai vastuuvapaina kaikista vaateista tai
                      syytteistä, kolmansien osapuolien toimesta; vaikka ne
                      aiheutuisivat palveluun käyttäjien ja jäsenien
                      tuottamasta, jakamasta julkaistusta, muokatusta,
                      siirretystä tai muuten käyttöön saatetusta sisällöstä,
                      Global Fansy Oy:n palvelujen käyttämisestä, käyttäjän
                      käyttöehtoja tai muita oikeuksia vastaan rikkomisesta sen
                      koskiessa ketä tahansa muuta henkilöä/kolmatta osapuolta.
                      <h4 className="pt-5 font-xsss ">
                        10. PALVELUJEN KÄYTTÖ KAUPALLISIIN TARKOITUKSIIN
                      </h4>
                      Käyttäjien tulee sitoutua olla kopioimatta, toistamatta,
                      vaihtaa, myydä, jälleenmyydä tai muuten hyväksikäyttää
                      Global Fansy Oy:n palvelujen sisältöä kaupallisiin
                      tarkoituksiin.
                      <br />
                      <h4 className="pt-5 font-xsss ">
                        11. KÄYTÖN JA TALLETTAMISEN YLEISET KÄYTÄNNÖT
                      </h4>
                      Global Fansy Oy saattaa joutua asettamaan rajoituksia
                      palvelujensa käyttöön. Näitä voivat olla maksimiaika,
                      kuinka kauan sähköposteja ja viestejä sekä muuta ladattua
                      sisältöä säilytetään, tai lähetettyjen ja vastaanotettujen
                      sähköpostien ja viestien maksimimäärä, sähköpostien
                      maksimikoko, säilytystilan suuruus palvelimellamme, ja/tai
                      palvelun käytön maksimimäärä ja/tai -aika tietyn ajan
                      kuluessa. Lisäksi hyväksyt, että Global Fansy Oy ei ole
                      vastuullinen tai velvollinen edellä mainittujen
                      säilyttämisessä tai sen epäonnistuessa. Varaamme myös
                      oikeuden poistaa käyttäjätilin, joka on epäaktiivinen
                      pidemmän aikaa. Global Fansy Oy pidättää oikeuden muokata,
                      muuttaa ja/tai päivittää näitä yleisiä käytäntöjä ja
                      rajoituksia parhaaksi katsomallaan tavalla.
                      <br />
                      Kaikki viestimispalvelut, jotka kattavat myös kaikki
                      verkkopohjaiset versiot, sallivat sinun ja henkilöiden,
                      joiden kanssa kommunikoit, tallentaa keskustelut
                      tilillesi, joka sijaitsee Global Fansy Oy:n palvelimilla.
                      Tällä tavalla pääset keskusteluhistoriaan miltä tahansa
                      verkkoon kytketyltä tietokoneelta tai älylaitteelta. Olet
                      myös tietoinen, että muut voivat tallentaa keskustelut
                      kanssasi heidän omalle tililleen Global Fansyn alustalla.
                      Tämä käyttöehto sopimus määrittää suostumuksesi siihen,
                      että Global Fansy Oy:llä on oikeus tallettaa kaikki
                      kommunikaatiosi sen palvelimille.
                      <br />
                      <h4 className="pt-5 font-xsss ">12. MUOKKAUKSET</h4>
                      Global Fansy Oy pidättää oikeuden koska vaan muokata,
                      muuttaa tai lopettaa palvelunsa, osittain tai kokonaan,
                      väliaikaisesti tai pysyvästi, ennakkoilmoituksella tai
                      ilman sitä. Lisäksi emme ole vastuussa käyttäjille tai
                      mille tahansa kolmannelle osapuolelle näistä luetelluista
                      toimista koituvasta haitasta tai menetyksistä.
                      <h4 className="pt-5 font-xsss ">
                        13. TILIN LOPETTAMINEN
                      </h4>
                      Global Fansy Oy:n verkkoalustan ja mobiilisovelluksen
                      käyttäjänä voit peruuttaa tai lopettaa käyttäjätilisi,
                      siihen ja/tai pääsyn palveluihin lähettämällä peruutus-
                      tai lopetuspyynnön osoitteeseen info@globalfancy.com
                      Käyttäjänä hyväksyt, että Global Fansy Oy:llä on oikeus,
                      ilman kirjallista ennakkoilmoitusta, välittömästi estää,
                      lopettaa ja/tai rajoittaa tilinkäyttöoikeuttasi ja pääsyä
                      palveluihimme. Syitä edellä mainittuihin voivat olla
                      seuraavaanlaiset:
                      <br />
                      - kaikki käyttöehtoja ja sääntöjä vastaan rikkova toiminta
                      palvelussa;
                      <br />
                      - lainvalvojien tai muiden valtion tahojen vaatimus;
                      <br />
                      - palvelumme lopettaminen, muuttaminen ja/tai sen
                      sisältämän materiaalinen muokkaaminen, kokonaan tai
                      osittain;
                      <br />
                      - yllättävät tekniset tai turvallisuusongelmat palvelussa
                      <br />
                      - pitkä epäaktiivisuus tilin käytössä
                      <br />
                      - osallistuminen mihin tahansa petolliseen tai laittomaan
                      toimintaan.
                      <br />
                      Hyväksyt, että kaikki tilin sulkemiseen, estämiseen ja
                      rajoittamiseen edellä mainituista syistä on vain Global
                      Fansy Oy:n harkinnan varassa, emmekä ole vastuussa sinulle
                      tai kolmansille osapuolille koituvasta haitasta tai
                      menetyksestä tilin tai siihen liittyvän sähköpostin
                      sulkemiseen ja/tai palvelujen käytön rajoittamiseen
                      liittyen. Tilisi lopettaminen Global Fansy Oy:n alustalla
                      sisältää seuraavaa:
                      <br />
                      <br />
                      - salasanasi ja kaikkien tietojesi, tiedostojesi ja kaiken
                      tiliisi liittyvän ja sen sisältämän sisällön poistaminen.
                      <br />- Kaiken alustamme palvelujen käytön estäminen
                      tulevaisuudessa.
                      <h4 className="pt-5 font-xsss ">14. MAINOSTAJAT</h4>
                      Kaikki mainostajien kanssa tapahtuva viestintä tai
                      kaupallinen yhteistyö ja promootioihin osallistuminen,
                      olivat mainostajat alustallamme toimivia tai sen kautta,
                      ja näistä yhteistyösopimuksista seuraavat tavaran tai
                      palvelujen kaupat, maksut ja toimitukset, sekä niihin
                      liittyvät ehdot ja säännöt, takuut sekä mitä ne edustavat,
                      ovat pelkästään sinun ja mainostajan välisiä sopimuksia.
                      Hyväksyt, ettei Global Fansy Oy ole vastuullinen näistä
                      sopimuksista suoraan mahdollisesti syntyvästä haitasta tai
                      menetyksestä, tai tällaisen mainostajan läsnäolosta
                      palvelussamme.
                      <h4 className="pt-5 font-xsss ">15. LINKIT</h4>
                      Sekä Global Fansy Oy että kolmannet osapuolet voivat
                      linkittää verkkosivujaan tai lähteitään palveluumme.
                      Pyydämme huomioimaan, että Global Fansy oy ei ole
                      vastuullinen edellä mainittujen ulkoisten verkkosivujen
                      tai lähteiden saatavuudesta, ja siten emme kannusta niiden
                      käyttöön tai ole vastuullisia niiden sisällön, tuotteen,
                      mainostamisen tai muun materiaalin suhteen. Lisäksi
                      hyväksyt, ettei Global Fansy Oy:tä voi pitää vastuussa
                      suoraan tai epäsuoraan mistään haitasta tai menetyksestä,
                      jota näiden ulkoisten palveluiden tuotteisiin, palveluihin
                      tai sisältöön luottamisesta tai käyttämisestä aiheutuu tai
                      väitetään aiheutuvan.
                      <h4 className="pt-5 font-xsss ">16. OMISTUSOIKEUDET</h4>
                      Täten tiedostat ja hyväksyt, että Global Fansy Oy:n
                      palvelut ja kaikki keskeinen ohjelmisto, joka on käytössä
                      palvelussamme, sisältää omistusoikeudellista ja
                      luottamuksellista materiaalia, joka on suojattu soveltuvin
                      teollis- ja tekijäoikeuksin ja niihin liittyvien lakien
                      toimesta. Tiedostat myös, että kaikki mainokset ja
                      informaatio, joita on palvelussamme tai palvelumme kautta,
                      tai mainostajien toimesta, on suojattu vastaavilla
                      oikeuksilla ja lailla kuin edellä on kerrottu. Siten
                      lukuunottamatta lain erikseen sallimissa tapauksissa tai
                      Global Fansy Oy:n tai vastaavan lisensoijan niin
                      salliessa, sitoudut olla muuttamatta, muokkaamatta,
                      leasaamatta, vuokraamatta, lainaamatta, myymättä,
                      toimittamatta, siirtämättä, lähettämättä julki, julkisesti
                      esittämättä ja/tai plagioda Global Fansy Oy:n alustalla
                      julkaistua materiaalia, kokonaisuutena tai osana.
                      <br />
                      Global Fansy Oy tarjoaa sinulle käyttöön henkilökohtaisen,
                      ei siirto-oikeudellisen ja ei yksinomaisen oikeuden ja/tai
                      lisenssin käyttökoodimme tai ohjelmistomme käyttöön
                      laitteellasi, niin kauan kun et salli kenenkään kolmannen
                      osapuolen kopioida, muuttaa, muokata, tuottaa tai
                      plagioida sisältöä palveluun tai palvelusta,
                      takaisinmallintaa tai muulla tavalla yrittää päästä
                      perille lähdekoodeistamme, myydä, alilisensoida, sallia
                      tietoturvaa vaarantavaa toimintaa ja/tai vastaavalla
                      tavalla siirtää tätä oikeutta ohjelmistoon muille. Lisäksi
                      sitoudut itse olla muuttamatta tai muokkaamatta
                      ohjelmistoa mitenkään, ja pitäytyä käyttämästä muutettuja
                      tai muokattuja ohjelmiston versioita. Tähän sisältyy
                      ehdottomasti yritys käyttää palvelujamme ilman
                      käyttöoikeutta. Lopuksi pitäydyt käyttämästä tai
                      yrityksestä käyttää palvelujamme mitenkään muuten kuin
                      Global Fansy Oy:n tarjoaman käyttöliittymän kautta.
                      <h4 className="pt-5 font-xsss ">
                        17. VASTUUVAPAUTUSLAUSEKE
                      </h4>
                      Kaikkien yksityishenkilöiden ja yritysten, jotka käyttävät
                      Global Fansy Oy:n sovelluksia tai palveluita oletetaan
                      lukeneen ja hyväksyneen seuraavat ehdot: Global Fansy Oy:n
                      tarjoamien palveluiden ja alustan sekä aplikaatioiden
                      käyttö on täysin omalla vastuullasi. Kaikki edellämainitut
                      tarjotaan käyttöön sellaisena kuin ne ovat saatavilla.
                      <br />
                      Global Fansy Oy ja yhteistyötahomme, työntekijämme ja
                      kaikki sidosryhmämme sekä lisensoijamme ovat vapaita
                      vastuista, jotka liittyvät sisällön käyttöoikeuksiin, sen
                      kaupallistamiseen, soveltumiseen suunniteltuun
                      käyttötarkoitukseen ja tekijänoikeuksien rikkomiseen. Emme
                      myöskään vastaa siitä, että palvelut ja alusta vastaa
                      vaatimuksiasi. Tai toimisivat täysin ilman keskeytyksiä,
                      olisivat ajantasaisia, turvallisia tai virheettömiä. Että
                      lopputulokset palveluiden ja/tai alustan käytöstä olisivat
                      paikkansapitäviä tai luotettavia.
                      <br />
                      Emmekä vastaa minkään tuotteen, palvelun, informaation tai
                      muun materiaalin laadusta, joka on ostettu tai muutoin
                      saatu haltuun alustamme tai tarjoamamme palvelun kautta.
                      Tai että ne täyttäisivät odotuksesi ja että mikä tahansa
                      tällainen virhe ohjelmistossamme ja/tai alustassamme
                      korjattaisiin. Minkä tahansa materiaalin tai informaation
                      lataaminen tai muuten haltuun saaminen Global Fansy Oy:n
                      alustoilta tai palveluista on täysin omalla harkinnallasi
                      tapahtuvaa sekä omalla vastuullasi, ja siten olet sen
                      aiheuttamasta mahdollisesta vahingosta tai haitasta
                      vastuussa itse.
                      <br />
                      Minkään neuvon tai tiedon saaminen kirjallisesti tai
                      suullisesti, jonka saat Global Fansy Oy:ltä ei tuo lisää
                      vastuita yhtiölle käyttöehtosopimuksessa kirjatun lisäksi.
                      <h4 className="pt-5 font-xsss ">18. VASTUUNRAJOITUS</h4>
                      Kaikkien yksityishenkilöiden ja yritysten, jotka käyttävät
                      Global Fansy Oy:n sovelluksia tai palveluita, oletetaan
                      lukeneen ja hyväksyneen seuraavat ehdot: Global Fansy Oy
                      ja yhteistyötahomme, alihankkijamme, työntekijämme ja
                      kaikki sidosryhmämme sekä lisensoijamme eivät ole
                      vastuussa mistään vahingoista joita mahdollisesti aiheutuu
                      kuten tulonmenetykset, mainehaitat, tiedon ja muun siihen
                      verrattavan menettäminen seuraavista syistä: Palvelun
                      käyttö tai sen katkot, Korvaavien tuotteiden ja
                      palveluiden hankkimisesta aiheutuneen kustannukset,
                      Tietojesi tai materiaaliesi luvaton käyttö tai
                      muuttaminen, Mikä tahansa kolmannen osapuolen toiminta
                      palvelussamme, Tai mikä tahansa muu asia mikä koskee
                      palveluamme.
                      <h4 className="pt-5 font-xsss ">
                        19. VAROITUS TALOUDELLISIIN SEIKKOIHIN LIITTYEN
                      </h4>
                      Jos käyttäjä vastaanottaa tai pyytää uutisia, viestejä,
                      tai muuta informaatiota palvelussamme, joka koskee
                      yhtiöitä, osakkeita, tarjouksia, sijoituksia tai
                      vakuuksia, pyydämme lukemaan edellä listatut
                      vastuuvapauslausekkeet ja vastuun rajoitukset uudelleen.
                      Global Fansy Oy:n sisällöt on tarkoitettu ensisijaisesti
                      tiedonjaon tarkoituksiin, ja osakekauppaan ja
                      investointiin tarkoitetut palvelut eivät ole
                      ensisijaisesti meidän palvelujamme. Global Fansy Oy ja
                      lisensoijamme eivät ole vastuussa palvelumme kautta
                      jaetusta edellä mainittuja aloja koskevasta tiedosta, tai
                      sen paikkaansa pitävyydestä, käyttökelpoisuudesta tai
                      saatavuudesta ja ei ole siten vastuussa mistään
                      osakekaupan tai sijoittamisen päätöksistä, joka pohjaa
                      tähän tietoon.
                      <h4 className="pt-5 font-xsss ">
                        20. TAKUIDEN POISSULKEMINEN JA RAJOITUKSET
                      </h4>
                      Pakottava lainsäädäntö ei salli kaikissa tapauksissa
                      nimenomaisen tai epäsuoran takuun poissulkemista tai
                      rajoittamista. Siten kaikki vastuuvapauslausekkeet eivät
                      mahdollisesti koske kaikkia.
                      <h4 className="pt-5 font-xsss ">
                        21. KOLMANNET OSAPUOLET
                      </h4>
                      Tiedostat, ymmärrät ja hyväksyt, että ellei
                      Käyttöehtosopimuksessa ole erikseen asiasta toisin
                      mainittu, tähän sopimukseen liittyy kolmansia osapuolia
                      edunsaajana.
                      <h4 className="pt-5 font-xsss ">22. TIEDOTUS</h4>
                      Global Fansy Oy saattaa lähettää sinulle tiedonantoja,
                      myös liittyen muutoksiin Käyttöehtosopimukseen. Näitä
                      voidaan lähettää sähköpostin, kirjepostin, MMS tai SMS
                      muodossa, tekstiviestinä, viesteinä palvelun kautta tai
                      muulla käyttökelpoisella olemassa olevalla tavalla tai
                      tulevassa kehitetyllä tavalla. Saatat jäädä ilman näitä
                      tiedotuksia, mikäli käyttöäsi on rajoitettu
                      Käyttösopimusehtojen määrittämän tavan vastaisen toiminnan
                      takia. Täten hyväksyt, että tällaisessa tapauksessa
                      saamatta jäänyt tiedotus johtuu sopimuksen vastaisesta
                      toiminnasta ja siten kaikkien tiedotusten saaminen on
                      sinun vastuullasi.
                      <h4 className="pt-5 font-xsss ">
                        23. TAVARAMERKKEJÄ JA TEKIJÄNOIKEUKSIA VASTAAN
                        RIKKOMISESTA ILMOITTAMINEN
                      </h4>
                      Global Fannsy Oy noudattaa tavaramerkki,- ja
                      tekijänoikeuslakeja ja käyttäjiemme tulee tehdä samoin.
                      Yhtiö voi yksipuolisella päätöksellään estää tai lopettaa
                      käyttäjätilejä, joissa toistuvasti rikotaan näitä lakeja
                      vastaan. Jos epäilet, että omia töitäsi tai muiden töitä
                      on kopioitu tekijänoikeuksien takaaman suojan vastaisesti,
                      tulee sinun toimittaa seuraavat tiedot:
                      <br />
                      - Kuvaus/selvitys työstä, jonka tekijänoikeuksia epäilet
                      rikotun;
                      <br />
                      - Selvitys tilistä jossa tämä epäilty rikkomus on
                      tapahtunut;
                      <br />
                      - Kotiosoitteesi, puhelinnumerosi ja sähköpostiosoitteesi;
                      <br />
                      - Lausunto, jossa kerrotaan, että väitetyn ja
                      kiistanalaisen työn käyttö ei ole ollut sallittua
                      tekijänoikeuden haltijan, hänen edustajansa tai lain
                      puolesta;
                      <br />
                      - Lopuksi lausunto, jossa vakuutat rangaistuksen uhalla,
                      että edellä annettu tieto on totuudenmukaista, että olet
                      tekijänoikeuksien haltija, tai niiden haltijan edustaja ja
                      toimit hänen suostumuksellaan.
                      <br />
                      Ilmoituksen voit tehdä sähköpostilla osoitteeseen
                      info@globalfansy.com
                      <br />
                      <b>YLEISTÄ TIETOA</b>
                      <h4 className="pt-5 font-xsss ">
                        24. KAIKENKATTAVA SOPIMUS
                      </h4>
                      Tämä käyttöehtosopimus muodostaa kaikenkattavan sopimuksen
                      sinun ja Global Fansy Oy:n välille, ja koskee
                      palveluidemme käyttöä. Tämä sopimus korvaa kaikki
                      mahdolliset aikaisemmat tehdyt käyttöehtosopimukset.
                      Saatat joutua sopimaan lisäehdoista, jos ostat Gobal Fansy
                      Oy:n joitakin palvelua, yhteistyökumppaniemme palveluja
                      tai kolmansien osapuolien palveluja tai ohjelmistoja.
                      <h4 className="pt-5 font-xsss ">25. SOVELLETTAVA LAKI</h4>
                      Tässä käyttöehtosopimuksessa määritetään, että
                      sopimuksessa käytetty lainsäädäntö on Suomen lakeihin
                      perustuva. Mahdolliset oikeudenkäynnit ja muut kiistat
                      hoidetaan Suomen oikeuslaitoksen toimesta.
                      <h4 className="pt-5 font-xsss ">
                        26. VAATEISTA LUOPUMINEN/EHTOJEN ERILLISYYS
                      </h4>
                      Jos kumpi tahansa osapuoli luopuu tämän sopimuksen
                      rikkomista koskevasta vaateesta tai siihen perustuvasta
                      oikeudesta, luopuminen ei merkitse luopumista mistään
                      myöhemmästä vaateesta tai oikeudesta. Jos toimivaltainen
                      tuomioistuin toteaa minkä tahansa tämän sopimuksen
                      määräyksen pätemättömäksi tai täytäntöönpanokelvottomaksi,
                      tällainen määräys erotetaan sopimuksen muusta sisällöstä,
                      joka pysyy täysin voimassa.
                      <h4 className="pt-5 font-xsss ">
                        27. TILIN PERINTÄOIKEUDESTA
                      </h4>
                      Tiedostat, ymmärrät ja hyväksyt, että käyttäjätilisi ei
                      ole kuolemantapauksen sattuessa perittävissä tai
                      siirrettävissä perillisillesi tai muille osapuolille ja
                      tili lopetetaan. Kuolintodistus tulee toimittaa Global
                      Fansy Oy:lle ja tilin lopettamisen lisäksi kaikki sisältö
                      poistetaan pysyvästi.
                      <h4 className="pt-5 font-xsss ">28. VANHENTUMISSÄÄNTÖ</h4>
                      Tiedostat, ymmärrät ja hyväksyt, että riippumatta mistä
                      tahansa vastakohtaisesta lainkohdasta, kaikki kanteet ja
                      valitukset palvelun käyttöömme tai käyttöehtosopimukseen
                      liittyen tulee esittää yhden (1) vuoden kuluessa
                      tapahtuneesta, Sen jälkeen se on vanhentunut.
                      <h4 className="pt-5 font-xsss ">RIKKOMUKSET</h4>
                      Yhteystiedot ilmoittamisesta rikkomuksista
                      käyttöehtosopimusta vastaan: info@globalfansy.com

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
