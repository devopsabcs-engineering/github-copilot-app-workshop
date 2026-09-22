---
title: État de la validation
description: Ce qui a été vérifié par machine, ce qui relève du jugement humain, ce qui n'a pas été vérifié du tout, et les exigences bloquantes qui interdisent toute date de séance.
lang: fr
translation_key: facilitator-validation-status
parent: Trousse d'animation
grand_parent: Français
nav_order: 4
covers:
  - unrehearsed-proposal-notice
  - scope-boundaries
---

# État de la validation

Consigné le 2026-09-22, à la fin de la rédaction. Cette page existe pour que personne n'ait à déduire l'état de cet atelier du seul fait qu'une construction a réussi.

> [!CAUTION]
> **Cet atelier n'est pas prêt à être livré, et aucune date de séance ne doit être proposée à un client tant que les exigences bloquantes ci-dessous restent ouvertes.** Tout ce qui a été vérifié est une propriété de ce dépôt. Rien de ce qui a été vérifié n'est une propriété d'une salle, d'un réseau, d'un locataire, d'une image de poste ou de l'application elle-même. Une construction réussie prouve que le site et les supports ont été produits correctement. Elle ne prouve rien quant au bon déroulement de la séance.

## Comment lire cette page

Trois catégories, tenues strictement séparées, parce que le défaut contre lequel cette page est écrite consiste à faire passer un élément non vérifié pour un élément vérifié.

* **Vérifié par machine.** Une commande a été exécutée, son code de sortie observé, et son assertion échoue réellement lorsque la propriété est fausse. Reproductible par quiconque exécute la même commande.
* **Jugement humain.** Une personne a regardé quelque chose et s'est forgé une opinion. C'est une preuve réelle, plus faible qu'une vérification automatique, et non reproductible en relançant quoi que ce soit.
* **Non vérifié du tout.** Aucune vérification n'a été faite. Un élément de cette catégorie n'est pas « probablement correct ». Il est inconnu.

## Vérifié par machine

Chaque élément ci-dessous a été exécuté sur ce dépôt à la date indiquée, avec un code de sortie nul.

| Vérification | Commande | Résultat |
| --- | --- | --- |
| Installation propre des dépendances | `npm ci` | 21 paquets, reproductibles à partir du fichier de verrouillage |
| Audit des dépendances de production | `npm run audit:deps` | 0 vulnérabilité, conforme à la référence de SUPPLY-CHAIN.md |
| Dérive des dépendances | `npm ls --omit=dev --all` comparé à SUPPLY-CHAIN.md | Ensemble de paquets identique, aucune dérive |
| Génération des supports depuis un arbre propre | `npm run build:decks`, répertoire de sortie supprimé au préalable | Les deux supports produits, le générateur crée son propre répertoire |
| Construction du site | `bundle exec jekyll build` avec `BUNDLE_GEMFILE=docs/Gemfile` | Construit, sans erreur |
| Parité de contenu sur cinq surfaces | `npm run validate:content` | 28 pages, navigation saine, chemin de base vérifié sur le site construit |
| Validation des supports, diapositive par diapositive | `npm run validate:decks` | 16 diapositives par support, six sections, taux d'accents français de 3,14 % pour un seuil de 1,50 % |
| Résolution des liens internes | `npm run validate:links` | 28 documents parcourus, 871 références internes résolues vers des fichiers réels, 303 ancres résolues, les deux supports résolus |
| Contre-vérification des liens internes | `htmltest` 0.17.0 sur le site construit | 28 documents, aucun problème, en accord indépendant avec la ligne précédente |
| Liens externes | `npm run validate:links -- --external` | 13 adresses distinctes, toutes en HTTP 200 |
| Accessibilité, toutes les pages construites | axe-core 4.13.0, règles WCAG 2.0/2.1/2.2 niveaux A et AA, les 28 pages à 1280 puis à 400 pixels CSS | Aucune violation sur les 56 passages, 16 101 vérifications réussies |
| Ordre de tabulation et langue du document | Audit statique des 28 pages construites | Lien d'évitement en premier sur les 28, aucun `tabindex` positif, 14 pages déclarent `en` et 14 déclarent `fr` |
| Redistribution du contenu | Les 28 pages à 640 puis à 320 pixels CSS | Aucun défilement horizontal sur les 56 vérifications |
| Géométrie des supports, toutes diapositives | Texte et géométrie des cadres lus dans les binaires `.pptx` produits, 160 blocs de texte sur les 32 diapositives | Chaque chaîne mesurée tient dans son cadre, aucune forme hors diapositive |

Quatre défauts d'accessibilité ont été trouvés par ces vérifications, puis corrigés plutôt que consignés. Les deux premiers sont liés : corriger l'un a fait apparaître l'autre.

* Chaque tableau du site était un conteneur à défilement horizontal incapable de recevoir le focus clavier, ce qu'axe-core a signalé par `scrollable-region-focusable` dans les deux arborescences linguistiques. C'est un échec au critère WCAG 2.1.1 Clavier. Le conteneur est désormais focalisable et porte un nom accessible dans la bonne langue.
* Donner à tous ces conteneurs un seul et même nom a ensuite rendu chaque tableau indiscernable en tant que repère, ce qu'axe-core a signalé par `landmark-unique` sur chaque page portant au moins deux tableaux, dans les deux arborescences. Le libellé défini dans `docs/_layouts/table_wrappers.html` est maintenant numéroté par tableau au sein de sa page, ce qui rend chaque repère distinguable dans une liste de repères.
* Dix pages de la trousse d'animation, cinq par langue, ne portaient aucun titre de niveau un : chacune s'ouvrait sur `##` et la mise en page du thème n'insère pas le titre de l'en-tête dans le corps de la page. axe-core l'a signalé par `page-has-heading-one`. Chacune de ces pages s'ouvre désormais sur un `h1`, et les 28 pages construites en portent un.
* La mention d'attribution du thème en pied de page était du texte anglais rendu sans condition dans chaque page française, sans marquage. C'est un échec au critère WCAG 3.1.2. Elle est maintenant traduite sur les pages françaises, et la variante anglaise déclare sa propre langue.

## Jugement humain

* Les cinq diapositives les plus à risque — les françaises 1, 7, 12 et 14, et l'anglaise 3, celles qui portent le pied de page le plus long, les corps de texte les plus longs, l'accroche la plus longue et les titres les plus longs — ont été examinées sous forme de texte extrait des binaires et lu directement, chaque chaîne étant mesurée par rapport à son cadre. Les chaînes tiennent, et les caractères accentués ont survécu à la génération. **Il s'agit de la lecture d'un texte extrait, pas d'une image. Aucune diapositive n'a jamais été rendue visuellement.** Voir DR-08 plus bas.
* Le contenu rédactionnel des ateliers, de la trousse d'animation et des deux supports a été écrit et relu à la main. Aucune vérification automatique n'établit que cette prose est exacte, à jour ou pédagogiquement valable.

## Non vérifié du tout

Rien dans cette section n'a été vérifié. Rien de tout cela ne doit être présenté comme fonctionnel.

* **Restitution vocale par lecteur d'écran.** La navigation marque bien chaque lien avec sa propre langue : 28 liens par page, 14 déclarant `en` et 14 déclarant `fr`, la barre latérale rendue étant identique octet pour octet dans les deux arborescences, exactement comme l'impose la mise en cache de ce composant. **Cela relève du balisage, pas de la restitution.** Aucun lecteur d'écran n'a été utilisé. Nul ne sait si une technologie d'assistance change réellement de voix sur ces attributs, donc la conformité au critère WCAG 3.1.2 pour la navigation reste non confirmée. Émettre un attribut `lang` ne prouve pas qu'une restitution change.
* **Contraste du titre du site et des liens de la barre latérale.** axe-core les a renvoyés comme *indéterminés*, et non comme réussis : l'outil n'a pas pu les calculer, ces éléments étant partiellement masqués ou posés sur un dégradé. On en compte 75 sur les 28 pages à 1280 pixels CSS, soit de deux à cinq par page selon le nombre de liens que cette page affiche, et aucun à 400 pixels où la barre latérale se replie. Le recalcul manuel à partir des couleurs réellement rendues les place tous au-dessus du niveau AA, le plus mince étant le lien de la barre latérale à 5,03:1 pour une exigence de 4,5:1. Cette marge est assez mince pour qu'une évolution du thème la franchisse sans bruit, et un calcul manuel n'équivaut pas à une réussite outillée.
* **L'aspect visuel des deux supports.** Aucun outil de rendu n'existe dans cet environnement : aucune diapositive n'a jamais été affichée. La géométrie a été mesurée dans les binaires, ce qui borne le risque de débordement mais ne dit rien de la lisibilité, du contraste, de l'équilibre visuel ni d'une substitution de police. C'est l'exigence bloquante DR-08.
* **Toutes les invites des ateliers.** Aucune invite de ce dépôt n'a jamais été exécutée en atelier. Aucun nom de capacité produit par l'une d'elles n'est garanti. Personne n'a observé le résultat d'aucune d'entre elles.
* **Le minutage.** Aucune durée de section, aucun découpage fin et aucun seuil d'abandon n'a été mesuré. Chaque valeur en minutes sur ce site est une estimation.
* **Le site publié.** GitHub Pages n'est pas activé : le flux de publication n'a jamais été exécuté et aucune page n'a jamais été servie depuis le chemin de base réel. Tout ce qui précède a été vérifié sur une construction locale.

## Exigences bloquantes

Chaque exigence ci-dessous est ouverte. Chacune bloque la livraison à elle seule ; elles ne s'échangent pas entre elles, et le nombre d'exigences refermées n'est pas une mesure de préparation.

| Exigence | Ce qui reste ouvert | Responsable | Preuve qui la referme |
| --- | --- | --- | --- |
| CUR-C1 | Le canevas de référence n'a jamais été produit, révisé ni déposé sur une image de poste. Sans lui, le chemin de reprise de la section 3 n'existe pas. | Responsable pédagogique | Un chemin de répertoire copiable déposé sur l'image, accompagné du compte rendu de révision |
| CUR-C2 | Aucune répétition chronométrée n'a été faite, dans aucune des deux langues. Il en faut deux par langue, sur l'image de poste des participants. | Responsable pédagogique, un animateur nommé par langue | Quatre relevés chronométrés, deux en anglais et deux en français, avec les durées par section |
| CUR-C5 | La charge simultanée en salle n'a jamais été testée. Vingt séances simultanées relève de l'hypothèse. | Responsable de livraison avec le lieu | Un test de charge réel, à l'effectif réel, sur le réseau réel |
| PRD-H1 | Le comportement du réseau et du mandataire n'est pas vérifié, y compris le cas non pris en charge du mandataire qui inspecte le trafic TLS. | Responsable réseau du client | Un résultat de connectivité rapporté du réseau client, nommant la configuration du mandataire |
| PRD-H2 | Aucun budget de crédits par poste, aucune mesure de consommation et aucun repli en cas de limitation n'existent. | Responsable facturation ou locataire du client | Un droit d'usage par poste et un repli écrit en cas d'épuisement en séance |
| PRD-H6 | L'information sur la télémétrie n'a pas été communiquée, et aucune autorisation écrite n'existe pour exécuter du code généré par l'IA sur des postes gérés. | Responsable gouvernance ou sécurité du client | Une autorisation signée, et la trace de la communication faite |
| RC-04 | La politique d'application par poste n'a pas été vérifiée. Elle peut bloquer l'application indépendamment du droit d'usage. | Administrateur du locataire client | Un résultat de vérification par poste sur le locataire réel |
| DR-07 | Aucune capture d'écran n'existe dans ce dépôt, car toute capture suppose une répétition qui n'a pas eu lieu. | Responsable pédagogique | Des images nettoyées prises pendant la répétition, portant chacune la version de l'application et la date |
| DR-08 | Aucun des deux supports n'a jamais été rendu ni regardé. Aucun outil de rendu n'existe dans cet environnement : l'inspection s'est réduite à mesurer le texte extrait par rapport à la géométrie des cadres. Lisibilité, contraste, équilibre visuel et substitution de police restent inexaminés. | Responsable pédagogique | Les 32 diapositives rendues et inspectées, puis une revue de conception par le responsable pédagogique |
| DR-09 | GitHub Pages n'est pas activé sur ce dépôt. L'étape de configuration du flux échoue dès la première exécution, y compris sur les demandes de tirage. | Propriétaire du dépôt | Pages activé avec la source Actions, et une exécution réussie du flux |
| DR-10 | L'action `ruby/setup-ruby` est absente de la liste d'actions autorisées. La tâche de construction ne peut pas installer Ruby. | Propriétaire du dépôt ou de l'organisation | L'action présente dans la liste autorisée, et une exécution réussie du flux |
| OD-02 à OD-05, OD-07, OD-08 | Décisions ouvertes : autorisation d'exécuter du code généré, plafond de participants et nombre d'animateurs, cohortes séparées ou bilingue, conservation du code produit, affectation des participants à un parcours, et acceptation du paquet fictif `https`. | Responsable de livraison et parrain client | Une décision consignée par point |

DR-08 mérite d'être dit clairement, parce qu'une version précédente de cette page la déclarait refermée. Elle ne l'est pas. Le défaut de mise en page côté générateur qui l'avait motivée a bien été trouvé et corrigé, et les 160 blocs de texte des 32 diapositives ont été mesurés par rapport à leur cadre sans aucun débordement, mais **mesurer un binaire n'est pas regarder une diapositive.** Aucun outil de rendu n'a jamais été disponible ici. L'exigence reste ouverte.

## Outils substitués

Deux vérifications ont été menées avec d'autres outils que ceux prévus. Les deux substitutions sont consignées ici plutôt que laissées implicites.

* **Vérification des liens.** `lychee` et `linkinator` étaient indisponibles : le mandataire de paquets configuré refuse toute récupération d'archive avec `EALLOWREMOTE`. `scripts/validate-links.mjs` a donc été écrit. Il résout au lieu de reconnaître des motifs : chaque référence est associée à un fichier réel du site construit, et chaque ancre à un identifiant du document ciblé. Il a été éprouvé sur une copie du site volontairement cassée, portant une page manquante, une ancre manquante, un support manquant et une sortie du chemin de base ; il a signalé les quatre et s'est terminé en échec. Il fait désormais partie de `validate:all` et du flux de publication. `htmltest` 0.17.0 a ensuite été installé via `go install`, qui ne passe pas par le mandataire npm, et exécuté sur le site construit comme contre-vérification indépendante : 28 documents, aucun problème, en accord avec le validateur local. `htmltest` sert uniquement de contre-vérification et n'est pas câblé dans `validate:all`, car ce n'est pas une dépendance déclarée de ce dépôt.
* **Accessibilité.** `pa11y` n'a pas pu être installé pour la raison de mandataire npm ci-dessus. `axe-core` 4.13.0, l'un des deux outils initialement nommés, a été chargé directement depuis un réseau de diffusion et exécuté dans un vrai navigateur sur les 28 pages construites, à deux largeurs de fenêtre. C'est bien l'outil prévu, et non un substitut : seul son mode d'obtention a changé.

## Ce qui périme cette page

Relancez les vérifications et redatez cette page lorsque le modèle de contenu change, lorsque le thème ou une dépendance est mis à jour, lorsqu'une répétition a lieu, ou lorsque Pages est activé. Un relevé de validation qui survit à ce qu'il décrit est pire que rien, car il invite exactement à l'hypothèse que cette page cherche à empêcher.
