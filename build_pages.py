#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import os, sys
BASE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "projects")

STYLE = """    <style>
        .eb-page { max-width:900px; margin:0 auto; padding:3.5rem 1.5rem 5rem 1.5rem; font-family:'Courier Prime',monospace; color:#f7f7f7; }
        .eb-page h1 { font-size:3rem; font-weight:400; letter-spacing:0.04em; color:#fff; margin-bottom:0.3rem; }
        .eb-page h2 { font-size:1.8rem; font-weight:400; letter-spacing:0.03em; color:#fff; margin:3rem 0 1rem; border-top:1px solid rgba(255,255,255,0.08); padding-top:2.5rem; }
        .eb-meta { font-size:0.85rem; color:#888; margin-bottom:1.8rem; letter-spacing:0.14em; text-transform:uppercase; }
        .eb-label { font-size:0.75rem; letter-spacing:0.16em; text-transform:uppercase; color:#666; margin-bottom:0.7rem; }
        .eb-block { font-size:1.08rem; line-height:1.85; color:#e8e8e8; margin-bottom:2.5rem; }
        .eb-block p { margin-bottom:1.2rem; }
        .eb-block em { font-style:italic; color:#ccc; }
        .eb-block strong { color:#fff; }
        .eb-block ul { margin:0.6rem 0 0 1.4rem; }
        .eb-block ul li { margin-bottom:0.4rem; }
        .eb-video { position:relative; padding-bottom:56.25%; height:0; overflow:hidden; border-radius:10px; margin-bottom:2.8rem; }
        .eb-video iframe { position:absolute; top:0; left:0; width:100%; height:100%; }
        .eb-credits { font-size:0.95rem; color:#999; line-height:1.8; border-top:1px solid rgba(255,255,255,0.08); padding-top:1.8rem; margin-bottom:3rem; }
        .eb-gallery-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:0.55rem; margin-bottom:3rem; }
        @media(max-width:700px){ .eb-gallery-grid{ grid-template-columns:repeat(2,1fr); } }
        .eb-thumb { position:relative; aspect-ratio:1; overflow:hidden; border-radius:6px; cursor:pointer; background:#111; }
        .eb-thumb img { width:100%; height:100%; object-fit:cover; display:block; transition:transform 0.35s ease,filter 0.35s ease; }
        .eb-thumb:hover img { transform:scale(1.07); filter:brightness(0.7); }
        .eb-thumb-overlay { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; opacity:0; transition:opacity 0.3s ease; }
        .eb-thumb:hover .eb-thumb-overlay { opacity:1; }
        .eb-thumb-overlay svg { width:32px; height:32px; fill:none; stroke:#fff; stroke-width:1.5; }
        #lb-overlay { display:none; position:fixed; inset:0; background:rgba(0,0,0,0.95); z-index:9999; align-items:center; justify-content:center; }
        #lb-overlay.active { display:flex; }
        #lb-img { max-width:88vw; max-height:85vh; object-fit:contain; border-radius:6px; box-shadow:0 8px 60px rgba(0,0,0,0.8); animation:lb-in 0.22s ease; display:block; }
        @keyframes lb-in { from{opacity:0;transform:scale(0.93)} to{opacity:1;transform:scale(1)} }
        #lb-close { position:fixed; top:1.2rem; right:1.6rem; color:#fff; font-size:2rem; cursor:pointer; opacity:0.6; transition:opacity 0.2s; font-family:monospace; line-height:1; }
        #lb-close:hover { opacity:1; }
        .lb-arrow { position:fixed; top:50%; transform:translateY(-50%); background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); color:#fff; font-size:1.8rem; cursor:pointer; padding:0.6rem 1rem; border-radius:4px; transition:background 0.2s; user-select:none; line-height:1; }
        .lb-arrow:hover { background:rgba(255,255,255,0.18); }
        #lb-prev { left:1.2rem; } #lb-next { right:1.2rem; }
        #lb-counter { position:fixed; bottom:1.5rem; left:50%; transform:translateX(-50%); color:rgba(255,255,255,0.45); font-size:0.8rem; font-family:'Courier Prime',monospace; letter-spacing:0.1em; }
    </style>"""

NAV = """    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-logo"><a href="../index.html">Boris Pimenov</a></div>
            <div class="nav-menu">
                <a href="../index.html#portfolio" class="nav-link">Portfolio</a>
                <a href="../index.html#about" class="nav-link">About</a>
                <a href="../index.html#news" class="nav-link">News</a>
                <a href="../index.html#contact" class="nav-link">Contact</a>
            </div>
        </div>
    </nav>"""

LB_HTML = """    <div id="lb-overlay">
        <span id="lb-close" onclick="closeLB()">&#x2715;</span>
        <span class="lb-arrow" id="lb-prev" onclick="lbNav(-1)">&#8592;</span>
        <img id="lb-img" src="" alt="">
        <span class="lb-arrow" id="lb-next" onclick="lbNav(1)">&#8594;</span>
        <div id="lb-counter"></div>
    </div>"""

LB_JS = """    <script>
    var lbImages=[],lbIdx=0;
    function openLB(imgs,i){lbImages=imgs;lbIdx=i;showLBImage();document.getElementById('lb-overlay').classList.add('active');}
    function closeLB(){document.getElementById('lb-overlay').classList.remove('active');}
    function lbNav(d){lbIdx=(lbIdx+d+lbImages.length)%lbImages.length;showLBImage();}
    function showLBImage(){var img=document.getElementById('lb-img');img.style.animation='none';img.offsetHeight;img.style.animation='';img.src=lbImages[lbIdx];document.getElementById('lb-counter').textContent=(lbIdx+1)+'/'+lbImages.length;}
    document.addEventListener('keydown',function(e){var o=document.getElementById('lb-overlay');if(!o.classList.contains('active'))return;if(e.key==='Escape')closeLB();if(e.key==='ArrowLeft')lbNav(-1);if(e.key==='ArrowRight')lbNav(1);});
    </script>"""

FOOTER = """    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-copyright">&copy; 2025 Boris Pimenov &mdash; Artista e regista italo-russo</div>
                <div class="footer-credits">Esplorando l'ibrido tra corpo performativo e spazio digitale</div>
            </div>
        </div>
    </footer>"""

SVG_LENS = '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="22" y2="22"/></svg>'

def make_gallery(imgs, var):
    thumbs = ""
    for i, src in enumerate(imgs):
        thumbs += f"""                <div class="eb-thumb" onclick="openLB({var},{i})">
                    <img src="{src}" alt="">
                    <div class="eb-thumb-overlay">{SVG_LENS}</div>
                </div>\n"""
    js_arr = "[" + ",".join(f"'{s}'" for s in imgs) + "]"
    return f"""            <div class="eb-gallery-grid">
{thumbs}            </div>
            <script>var {var}={js_arr};</script>"""

def head(title):
    return f"""<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    <link rel="stylesheet" href="../style.css">
    <link href="https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;1,400&display=swap" rel="stylesheet">
{STYLE}
</head>"""

def wrap(title, body, has_lb=False):
    lb = LB_HTML + "\n" if has_lb else ""
    lb_js = "\n" + LB_JS if has_lb else ""
    return head(title) + f"""
<body style="padding-top:4.5rem;">
    <div class="film-grain"></div>
{lb}{NAV}
    <main>
{body}
    </main>
{FOOTER}
    <script src="../script.js"></script>{lb_js}
</body>
</html>"""

# ── RASI AL SUOLO ──────────────────────────────────────────────────
rasi_body = """        <div class="eb-page">
            <p class="eb-meta">2024 &nbsp;/&nbsp; Video, teatro &nbsp;/&nbsp; Collinarea Festival del Suono 2024</p>
            <h1>Rasi al Suolo</h1>
            <p class="eb-meta" style="margin-top:-0.6rem;margin-bottom:2.5rem;">di Loris Seghizzi e Cesare Inzerillo</p>

            <p class="eb-label">Trailer</p>
            <div class="eb-video">
                <iframe title="vimeo-player" src="https://player.vimeo.com/video/1149683476?h=adacda1cd1" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" allowfullscreen></iframe>
            </div>

            <p class="eb-label">Note di regia</p>
            <div class="eb-block">
                <p><em>Rasi al suolo</em> &egrave; il secondo capitolo della Trilogia con tulle e segue <em>Tempo InFausto</em>.</p>
                <p>Commedia noir a colori. Indagine cruda e irriverente, scontata e retorica, senza pessimismo, sulla miseria dell&rsquo;essere umano.</p>
                <p>La scena si svolge in un paesino di provincia, in un tempo che non &egrave; dato sapere, dal sapore retr&ograve; che potrebbe risultare ingannatore, come sempre lo &egrave; il teatro stesso&hellip;</p>
            </div>
            <div class="eb-block">
                <p>Luogo sospeso, errato, come gli eventi che ne caratterizzano la storia.</p>
                <p>L&rsquo;errore &egrave; come il particolare, come si palesa stravolge tutto, non necessariamente in peggio alcune volte, ma non &egrave; questo il caso&hellip;</p>
                <p>Emergono qui le virt&ugrave; capitali, che rappresentano la parodia del nostro tempo, in quello che &egrave; diventato un minestrone indigeribile di religione e stato laico, su base di soffritto, ovviamente&hellip;</p>
            </div>

            <nav class="project-navigation">
                <a href="tosca.html" class="nav-link prev">Tosca</a>
                <a href="../index.html#portfolio" class="nav-link">Torna al Portfolio</a>
                <a href="libro-dolori.html" class="nav-link next">Il libro dei dolori dell&rsquo;infanzia</a>
            </nav>
        </div>"""

with open(os.path.join(BASE, "rasi-suolo.html"), "w", encoding="utf-8") as f:
    f.write(wrap("Rasi al Suolo &middot; Boris Pimenov", rasi_body))
print("OK rasi-suolo.html")

# ── TOSCA ──────────────────────────────────────────────────────────
tosca_imgs = [f"../assets/gallery/tosca{i}.png" for i in range(1,7)]
tosca_gal = make_gallery(tosca_imgs, "toscaImgs")

tosca_body = f"""        <div class="eb-page">
            <p class="eb-meta">Scenografia virtuale &nbsp;/&nbsp; Opera ubiqua</p>
            <h1>Tosca</h1>

            <h2>Sezione Classica</h2>
            <p class="eb-meta">Festival dell&rsquo;Opera di San Gimignano &mdash; 90&ordf; edizione</p>

            <p class="eb-label">Video</p>
            <div class="eb-video">
                <iframe title="vimeo-player" src="https://player.vimeo.com/video/1149244867?h=ecaa3b478b" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" allowfullscreen></iframe>
            </div>

            <p class="eb-label">Note</p>
            <div class="eb-block">
                <p>Per la 90&ordf; edizione del Festival dell&rsquo;Opera di San Gimignano, Boris Pimenov ha progettato e realizzato la scenografia virtuale per l&rsquo;opera <em>Tosca</em> di Giacomo Puccini. L&rsquo;intervento ridisegna lo spazio scenico attraverso ambienti digitali generati in tempo reale con TouchDesigner, che avvolgono il palcoscenico storico con architetture luminose, texture pittoriche e proiezioni volumetriche.</p>
                <p>Il progetto affronta la sfida di far coesistere la tradizione lirica con il linguaggio dell&rsquo;immagine interattiva: ogni atto possiede una palette visiva distinta, capace di amplificare la drammaturgia pucciniana senza sovrastarla. La scenografia virtuale dialoga con le scene fisiche creando un doppio registro &mdash; reale e digitale &mdash; che espande la percezione dello spazio e del tempo narrativo dell&rsquo;opera.</p>
            </div>

            <h2>Sezione Ubiqua</h2>
            <p class="eb-meta">Tosca d&rsquo;essai &mdash; Opera site-specific &mdash; Borgo di Lari</p>

            <p class="eb-label">Galleria</p>
{tosca_gal}

            <p class="eb-label">Note</p>
            <div class="eb-block">
                <p><em>Tosca d&rsquo;essai</em> &egrave; un&rsquo;opera ubiqua, immersiva e site-specific, che coinvolge i luoghi del borgo di Lari grazie all&rsquo;infrastruttura <strong>Connessioni</strong> ideata da Loris Seghizzi e Mirco Mencacci. Tra musica, teatro e realt&agrave; aumentata, lo spettacolo riscrive Puccini in una forma inedita. Un&rsquo;esperienza unica in Italia. Un esperimento artistico radicale narrato da una drammaturgia multistrato, distribuita nello spazio e nel tempo.</p>
                <p>Scarpia, Cavaradossi e Tosca rivivono la tragedia in tempo reale, mentre una troupe gira il film dell&rsquo;opera: questo duplice registro &egrave; il cuore pulsante di <em>Tosca d&rsquo;essai</em>. Da un lato, il pubblico assiste alla messa in scena dal vivo della vicenda pucciniana; dall&rsquo;altro, gli stessi gesti, le stesse emozioni e le stesse parole vengono catturate dalle telecamere e trasformate in film.</p>
            </div>

            <nav class="project-navigation">
                <a href="eburnea-teatro.html" class="nav-link prev">Eburnea</a>
                <a href="../index.html#portfolio" class="nav-link">Torna al Portfolio</a>
                <a href="libro-dolori.html" class="nav-link next">Il libro dei dolori dell&rsquo;infanzia</a>
            </nav>
        </div>"""

with open(os.path.join(BASE, "tosca.html"), "w", encoding="utf-8") as f:
    f.write(wrap("Tosca &middot; Boris Pimenov", tosca_body, has_lb=True))
print("OK tosca.html")

# ── SHINEL' ────────────────────────────────────────────────────────
shinel_body = """        <div class="eb-page">
            <p class="eb-meta">2024 &nbsp;/&nbsp; Cortometraggio &nbsp;/&nbsp; Grottesco-politico-sperimentale</p>
            <h1>SHINEL&rsquo;</h1>
            <p class="eb-meta" style="margin-top:-0.6rem;margin-bottom:2.5rem;">Il Cappotto</p>

            <p class="eb-label">Trailer</p>
            <div class="eb-video">
                <iframe title="vimeo-player" src="https://player.vimeo.com/video/1149349313?h=b5fc57f39b" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" allowfullscreen></iframe>
            </div>

            <p class="eb-label">Logline</p>
            <div class="eb-block">
                <p>Questo cortometraggio &egrave; un esperimento inquieto, un bambino perverso che non sa stare fermo, che sfugge al controllo, ambiguo e inafferrabile nel senso e nell&rsquo;intenzione. L&rsquo;immagine filmica si fonde con il suo creatore, in un processo di continua cucitura di un organismo ormai morto.</p>
                <p>Akakij Akakievic &egrave; un bambino folle che rincorre un&rsquo;infanzia sepolta, un&rsquo;ombra che non smette di ripetere il suo destino. Un archetipo sfruttato per mettere in scena un atto psicomagico, in cui tutto si dissolve, si confonde, si sfalda. Il rischio &egrave; concreto: dare corpo ai fantasmi quotidiani, lasciare che prendano forma, che infestino lo spazio visivo e mentale.</p>
                <p>E la bambina sui tacchi? Un angelo custode, una presenza che veglia su una dimensione fragile, bisognosa di cura. Lei &egrave; spettatrice e testimone, colei che accoglie e comprende, la redentrice di un mondo al limite del crollo.</p>
            </div>
            <div class="eb-block">
                <p><em>Shinel&rsquo;</em> &egrave; un viaggio intimo e inquieto attraverso lo spazio sospeso tra due culture, quella russa e quella italiana, e il vuoto che ne deriva. &Egrave; il tentativo di ricomporre una memoria impossibile, di riannodare i fili di un&rsquo;infanzia sepolta, di un&rsquo;identit&agrave; che sfugge e si ricostruisce nei frammenti di un passato che non appartiene interamente n&eacute; al presente n&eacute; al futuro.</p>
                <p>Questa ricerca si materializza in un teatro oscuro, un parallelepipedo immerso nel silenzio delle colline pisane, luogo di isolamento e di rivelazione. Come un bambino che gioca con il proibito, attraversa la soglia tra il reale e il fantastico, lasciandosi sedurre dalla possibilit&agrave; di perdersi.</p>
                <p>L&rsquo;opera prende ispirazione da <em>Il Cappotto</em> di Gogol&rsquo;, non come semplice adattamento, ma come evocazione di un sentimento profondo: la dissoluzione dell&rsquo;identit&agrave;, l&rsquo;ossessione per un oggetto che diventa simbolo di salvezza e condanna. Il cappotto diventa il ponte tra mondi diversi &mdash; tra ci&ograve; che si &egrave; e ci&ograve; che si vorrebbe essere, tra la cultura di origine e quella acquisita, tra il passato e il presente.</p>
            </div>

            <p class="eb-label">Scheda tecnica</p>
            <div class="eb-block">
                <ul>
                    <li><strong>Titolo:</strong> SHINEL&rsquo; (pronuncia: Scinel) &mdash; Il Cappotto</li>
                    <li><strong>Anno:</strong> 2024 &nbsp;/&nbsp; <strong>Durata:</strong> 25 minuti &nbsp;/&nbsp; <strong>Paese:</strong> Italia</li>
                    <li><strong>Lingua:</strong> Russo e Italiano &nbsp;/&nbsp; Sottotitoli: Italiano e Russo</li>
                    <li><strong>Formato:</strong> H.264 &mdash; 1920&times;1080 &mdash; Bianco e Nero &mdash; 16:9</li>
                    <li><strong>Genere:</strong> Grottesco-politico-sperimentale</li>
                    <li><strong>Musica:</strong> Rodolfo de Angelis, Chesnokov, Leonid Utesov, Ludwig Van Beethoven</li>
                </ul>
            </div>

            <div class="eb-credits">
                Regia, sceneggiatura, montaggio, fotografia, scenografia, costumi, suono: Boris Pimenov<br>
                Soggetto: <em>Il Cappotto</em> &mdash; Nikolaj Gogol&rsquo;<br>
                <strong>Akakij Akakevic:</strong> Boris Pimenov &nbsp;&nbsp;/&nbsp;&nbsp; <strong>La Bambina sui tacchi:</strong> Egle Spaccarelli
            </div>

            <nav class="project-navigation">
                <a href="matto-pesca.html" class="nav-link prev">The Peach and the Madman</a>
                <a href="../index.html#portfolio" class="nav-link">Torna al Portfolio</a>
                <a href="libro-dolori.html" class="nav-link next">Il libro dei dolori dell&rsquo;infanzia</a>
            </nav>
        </div>"""

with open(os.path.join(BASE, "shinel.html"), "w", encoding="utf-8") as f:
    f.write(wrap("SHINEL&rsquo; (Il Cappotto) &middot; Boris Pimenov", shinel_body))
print("OK shinel.html")

# ── LIBRO DEI DOLORI ───────────────────────────────────────────────
libro_imgs = [f"../assets/gallery/libro-dolori{i}.png" for i in range(1,7)]
libro_gal = make_gallery(libro_imgs, "libroImgs")

libro_body = f"""        <div class="eb-page">
            <p class="eb-meta">2025 &nbsp;/&nbsp; Cortometraggio indipendente</p>
            <h1>Il libro dei dolori dell&rsquo;infanzia</h1>

            <p class="eb-label">Galleria</p>
{libro_gal}

            <p class="eb-label">Film</p>
            <div class="eb-video">
                <iframe title="vimeo-player" src="https://player.vimeo.com/video/1147339473?h=74595019d6" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" allowfullscreen></iframe>
            </div>

            <p class="eb-label">Note</p>
            <div class="eb-block">
                <p><em>Il libro dei dolori dell&rsquo;infanzia</em> &egrave; un poema visivo sulla memoria e la misericordia &mdash; una veglia senza tempo sospesa tra gelo e tenerezza.</p>
                <p>L&rsquo;opera attraversa la materia come un rito funebre: terra, garza, patate, cenere &mdash; reliquie di un mondo infantile che si rifiuta di morire. La luce &egrave; il vero personaggio: blu, tremante, che taglia il buio come una lama che non ferisce ma divide l&rsquo;aria in due respiri.</p>
                <p>Il suono &mdash; crepitante, lontano &mdash; &egrave; quello di una ninna nanna russa dimenticata, come suonata dal grammofono di un sogno. Non c&rsquo;&egrave; redenzione, solo il tentativo di afferrare la forma del dolore, toccarla senza nominarla, offrirle un corpo attraverso il rituale della fasciatura e della ripetizione.</p>
                <p>Ogni gesto &egrave; un atto di fede cieca: fasciare, sbucciare, scaldare, osservare. L&rsquo;infanzia non &egrave; innocenza, ma una ferita luminosa che continua a pulsare in chi resta.</p>
                <p><em>Il libro dei dolori dell&rsquo;infanzia</em> non racconta una storia &mdash; ne evoca una. &Egrave; un sogno d&rsquo;inverno, una liturgia intima dove calore e morte si dissolvono l&rsquo;uno nell&rsquo;altra, dove il silenzio dei bambini parla pi&ugrave; forte di qualsiasi parola.</p>
            </div>

            <div class="eb-credits">
                Concept, regia e ruolo del &ldquo;Ragazzo&rdquo;: Boris Pimenov<br>
                Nel ruolo della ragazza: Ksenia Rotar&rsquo;<br>
                Sound design: Grigorij Lavrov &nbsp;/&nbsp; Durata: 18 minuti
            </div>

            <nav class="project-navigation">
                <a href="shinel.html" class="nav-link prev">SHINEL&rsquo;</a>
                <a href="../index.html#portfolio" class="nav-link">Torna al Portfolio</a>
                <a href="boheme.html" class="nav-link next">Boh&egrave;me</a>
            </nav>
        </div>"""

with open(os.path.join(BASE, "libro-dolori.html"), "w", encoding="utf-8") as f:
    f.write(wrap("Il libro dei dolori dell'infanzia &middot; Boris Pimenov", libro_body, has_lb=True))
print("OK libro-dolori.html")

# ── BOHEME ─────────────────────────────────────────────────────────
boheme_imgs = ["../assets/gallery/boheme1.jpg","../assets/gallery/boheme2.jpg","../assets/gallery/boheme3.jpg"]
boheme_gal = make_gallery(boheme_imgs, "bohemeImgs")

boheme_body = f"""        <div class="eb-page">
            <p class="eb-meta">Produzione Collinarea Festival 2024 &nbsp;/&nbsp; Regia: Loris Seghizzi</p>
            <h1>Boh&egrave;me</h1>
            <p class="eb-meta" style="margin-top:-0.6rem;margin-bottom:2.5rem;">La povert&agrave; mi &egrave; lieta</p>

            <p class="eb-label">Galleria</p>
{boheme_gal}

            <p class="eb-label">Video</p>
            <div class="eb-video">
                <iframe title="vimeo-player" src="https://player.vimeo.com/video/1149350179?h=7198c66afa" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" allowfullscreen></iframe>
            </div>

            <p class="eb-label">Note di regia</p>
            <div class="eb-block">
                <p><strong>Boh&egrave;me: La povert&agrave; mi &egrave; lieta</strong> &egrave; l&rsquo;ultimo atto della trilogia dedicata a Puccini &mdash; dopo <em>Atroce Favola</em> (Madama Butterfly, 2022) e <em>Turandot &ndash; ombra della luce</em> (2023) &mdash; nell&rsquo;anno delle celebrazioni del centenario della morte del grande Maestro.</p>
                <p>Boh&egrave;me &egrave; per noi uno spunto autobiografico. Quegli anni rappresentati a Parigi sono molto somiglianti agli anni vissuti dai nostri predecessori a Napoli, o nei tanti luoghi di quell&rsquo;Italia che si precipitava nella guerra, dove molti artisti continuarono il mestiere; e soprattutto dopo la guerra, quando nascevano le compagnie di giro, delle vere e proprie comuni viaggianti che riuscivano a campare grazie ad espedienti di ogni tipo, ma sempre spinti orgogliosamente dal "mestiere", dei veri boh&egrave;mien.</p>
            </div>
            <div class="eb-block">
                <p>In questa trasposizione contemporanea, La Boh&egrave;me si tiene nel luogo di residenza di Dolores, un&rsquo;anziana attrice che ha rivestito da giovane, nel 1954, il ruolo di Mim&igrave;. Per l&rsquo;occasione, vengono a farle visita i compagni di una vita, gli attori che composero quella storica compagnia teatrale. L&rsquo;opera riunisce il gruppo di artisti che visse quell&rsquo;epoca fortunata, fatta di sacrifici, viaggi, amori, incontri, tanto teatro, miseria e nobilt&agrave;&hellip; attraversando insieme buona parte del &rsquo;900.</p>
                <p>Lo spettacolo segue una linea realistica, intrecciata con quella surreale attraverso il tema del ricordo, frammenti di vita e d&rsquo;arte di un tempo che fu. La messa in scena &egrave; una cucitura tra musica colta, musica contemporanea, teatro, video; in una visione meta teatrale/musicale/cinematografica.</p>
                <p><a href="https://www.sartoriacaronte.it/opera-ubiqua/" target="_blank" rel="noopener" style="color:#e74c3c;">Scopri di pi&ugrave; su Sartoria Caronte &mdash; Opera Ubiqua &rarr;</a></p>
            </div>

            <nav class="project-navigation">
                <a href="libro-dolori.html" class="nav-link prev">Il libro dei dolori</a>
                <a href="../index.html#portfolio" class="nav-link">Torna al Portfolio</a>
                <a href="morricone.html" class="nav-link next">Sillabe di Ennio Morricone</a>
            </nav>
        </div>"""

with open(os.path.join(BASE, "boheme.html"), "w", encoding="utf-8") as f:
    f.write(wrap("Boheme - La poverta mi e lieta &middot; Boris Pimenov", boheme_body, has_lb=True))
print("OK boheme.html")

# ── COMPAGNIA DI GIRO ──────────────────────────────────────────────
giro_imgs = ["../assets/gallery/giro1.jpg","../assets/gallery/giro2.jpg","../assets/gallery/giro3.jpg"]
giro_gal = make_gallery(giro_imgs, "giroImgs")

giro_body = f"""        <div class="eb-page">
            <p class="eb-meta">2023&ndash;2024 &nbsp;/&nbsp; Progetto teatrale</p>
            <h1>Compagnia di Giro</h1>

            <p class="eb-label">Galleria</p>
{giro_gal}

            <p class="eb-label">Note</p>
            <div class="eb-block">
                <p>&ldquo;Nessuno nasce imparato&rdquo;, diceva qualcuno&hellip;</p>
                <p>&Egrave; proprio vero, nessuno nasce sapendo chi &egrave;, si impara a diventare e talvolta lo si fa grazie agli insegnanti che per mestiere, o per missione, passano ad altri il proprio sapere, sperando che ci sia almeno un allievo che superi il maestro e porti questo sapere in l&agrave;, pi&ugrave; in l&agrave;; trasformandolo, facendolo proprio, riadattandolo ai tempi, ma mantenendo i principi fondamentali che lo rendono unico. Bene, noi arriviamo da un tempo lontano, siamo figli di quella che fu una Compagnia di Giro.</p>
                <p>I nonni iniziarono, prima e durante la guerra; i genitori continuarono, noi siamo nati. Siamo nati lungo il cammino e abbiamo provato quella bellezza. Parliamo di una bellezza semplice, fatta di scambi tra attore e spettatore.</p>
            </div>
            <div class="eb-block">
                <p>Qualcosa di indispensabile. La gente ama il teatro se il teatro ama la gente, la rispetta, non crea distinzioni, la incontra, la desidera, la fa sedere come sulla sedia di casa. Non &egrave; teatro di piazza, n&eacute; di strada, non &egrave; di sala, non &egrave; commedia dell&rsquo;arte, n&eacute; prosa o ricerca&hellip; Ma &egrave; tutto questo allo stesso tempo, nello scambio puro e incondizionato con lo spettatore.</p>
                <p>Quell&rsquo;insegnamento c&rsquo;&egrave; rimasto dentro, come radice nella terra, &egrave; il nostro mestiere e la nostra missione, &egrave; il nostro vivere, tanto da non poterne fare a meno. Negli anni ottanta, quando Franco Seghizzi cap&igrave; che di compagnie di giro non ce n&rsquo;erano pi&ugrave;, chiam&ograve; la propria compagnia &ldquo;I Superstiti&rdquo;. Poi se ne and&ograve;.</p>
                <p>Credo che lui non lo sapesse, perch&eacute; di sicuro non gliene importava niente, ma era un Maestro&hellip;</p>
                <p style="color:#888;font-style:italic;">&mdash; Loris Seghizzi</p>
            </div>

            <p class="eb-label">Approfondimento</p>
            <div class="eb-block">
                <p><a href="https://www.sartoriacaronte.it/unplugged/" target="_blank" rel="noopener" style="color:#e74c3c;">Sartoria Caronte &mdash; Unplugged &rarr;</a></p>
            </div>

            <nav class="project-navigation">
                <a href="cinica-matrice.html" class="nav-link prev">Cinica Matrice</a>
                <a href="../index.html#portfolio" class="nav-link">Torna al Portfolio</a>
            </nav>
        </div>"""

with open(os.path.join(BASE, "compagnia-giro.html"), "w", encoding="utf-8") as f:
    f.write(wrap("Compagnia di Giro &middot; Boris Pimenov", giro_body, has_lb=True))
print("OK compagnia-giro.html")

# ── SILLABE DI ENNIO MORRICONE ─────────────────────────────────────
morricone_body = """        <div class="eb-page">
            <p class="eb-meta">2025 &nbsp;/&nbsp; Video arte &nbsp;/&nbsp; Armunia Castiglioncello Festival</p>
            <h1>Sillabe di Ennio Morricone</h1>

            <p class="eb-label">Reportage video</p>
            <div class="eb-video">
                <iframe src="https://player.vimeo.com/video/1151008206?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" title="Sillabe Di Ennio Morricone (Reportage)"></iframe>
            </div>

            <p class="eb-label">Note</p>
            <div class="eb-block">
                <p>In occasione dell&rsquo;<strong>Armunia Castiglioncello Festival</strong>, sabato 16 agosto alle ore 21:30 sul palco di Castello Pasquini &egrave; andato in scena <em>Sillabe di&hellip; Ennio Morricone</em>, con l&rsquo;Orchestra e il Coro Massimo De Bernart. La musica del grande Maestro protagonista sotto le stelle di Castiglioncello.</p>
                <p>Boris Pimenov ha lavorato come <strong>video artist</strong> per lo spettacolo, progettando e realizzando il commento visivo in tempo reale che ha accompagnato l&rsquo;esecuzione orchestrale. Le immagini generate con TouchDesigner si sono sincronizzate con la partitura di Morricone, creando un dialogo continuo tra suono e visione che ha trasformato il palcoscenico in uno spazio cinematografico sospeso tra epoche.</p>
                <p>Il progetto ha esplorato l&rsquo;archivio visivo e sonoro del compositore romano, rileggendo le sue sillabe musicali attraverso il filtro dell&rsquo;immagine generativa &mdash; texture di pellicola, paesaggi frammentati, geometrie organiche &mdash; in un omaggio che guarda al passato con gli strumenti del presente.</p>
            </div>

            <nav class="project-navigation">
                <a href="boheme.html" class="nav-link prev">Boh&egrave;me</a>
                <a href="../index.html#portfolio" class="nav-link">Torna al Portfolio</a>
                <a href="rasi-suolo.html" class="nav-link next">Rasi al Suolo</a>
            </nav>
        </div>"""

with open(os.path.join(BASE, "morricone.html"), "w", encoding="utf-8") as f:
    f.write(wrap("Sillabe di Ennio Morricone &middot; Boris Pimenov", morricone_body))
print("OK morricone.html")

print("\nTutti i file scritti con successo.")
