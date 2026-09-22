---
title: 03 - Vérifier et transmettre
description: Lire soi-même la vue des modifications, juger si la validation générée constitue une preuve, et décider séparément du partage du code et de celui de l'état.
lang: fr
translation_key: lab-03-verify-share
parent: Ateliers
grand_parent: Français
nav_order: 4
duration_minutes: 10
covers:
  - synthetic-data-only
  - no-endorsement
  - scope-boundaries
  - unrehearsed-proposal-notice
  - human-review-required
  - public-code-warning
  - delta-and-invariant-oracle
  - persistence-not-guaranteed
  - learner-decision
  - track-acceptance-bars
---

# Atelier 03 : vérifier et transmettre

Section 5 du parcours français. Dix minutes.

Le parcours anglais consacre quinze minutes à cette section. Le parcours
français en consacre dix, et les cinq minutes libérées sont allées à l'atelier
01. Ce choix repose sur une suppression précise, expliquée plus bas.

## Objectif

Lire vous-même ce qui a changé, décider si la validation produite par l'agent
constitue une preuve, et séparer deux décisions de partage que l'on confond
souvent.

## Avant de commencer

* Vous disposez d'un canevas utilisable et de vos relevés des ateliers 01 et 02.
* Vous avez retiré le filtre avant de commencer cette vérification.

## Déroulement des dix minutes

* 5 minutes : lecture de la vue des modifications et corrélation avec ce que
  vous voyez.
* 3 minutes : les deux décisions de partage.
* 2 minutes : consignation de ce qui reste inconnu.

## Le point de contrôle de réouverture est retiré en français

Il n'y a pas de vérification de fermeture et de réouverture dans ce parcours.
Ce n'est pas un oubli.

La documentation du canevas ne contient aucune section de réouverture, aucune
commande universelle de réouverture n'a été établie, et le comportement n'a
jamais été répété. Vérifier en classe un comportement non répété consommerait
cinq minutes sans produire de preuve, tout en risquant d'abîmer l'unique copie
de l'état. Ces cinq minutes sont donc allées à l'atelier 01, où la variabilité
est réelle et mesurable.

Une persistance demandée dans une invite est une exigence d'implémentation, pas
une propriété du produit. Tant qu'une répétition n'a pas eu lieu, personne ne
peut affirmer qu'un canevas survit à la fermeture de son panneau, au
redémarrage de sa session ou au redémarrage de l'application. Ce point de
contrôle reste un travail de suivi.

## La décision qui vous revient

Juger si la validation produite par l'agent constitue une preuve suffisante.

L'agent va vous présenter une revue. Vous devez décider si elle vaut comme
preuve, ou si elle n'est qu'une description de ce qui devrait être vrai. Un
critère utile : une affirmation est une preuve si vous pouvez la relier à
quelque chose que vous avez vu vous-même. Sinon, c'est une hypothèse, et elle se
consigne comme telle.

## Étapes

1. Ouvrez la vue des modifications et lisez-la vous-même, avant de demander
   quoi que ce soit à l'agent.
2. Reliez chaque fichier à un comportement que vous avez observé. Un fichier que
   vous ne pouvez relier à rien est une question, pas un détail.
3. Vérifiez les chemins de fichiers, les dépendances, les appels réseau et toute
   exécution de commande interpréteur.
4. Envoyez l'invite de revue ci-dessous, puis prenez votre décision.
5. Séparez les deux décisions de partage : le code de l'extension peut-il être
   partagé, et l'état du tableau peut-il l'être. Ce sont deux réponses
   distinctes, et rien ne garantit qu'elles soient identiques.
6. Écrivez ce qui reste inconnu. C'est ce que vous emporterez de plus utile.

## Invite de revue

Proposition non répétée. Cette invite n'a jamais été exécutée en atelier, et
les noms de capacités générés ne sont pas garantis.

```text
Examine les modifications du canevas sans modifier aucun fichier. Distingue clairement les résultats que tu as réellement observés des hypothèses. Vérifie l'état partagé, la validation des saisies, les chemins de fichiers, les dépendances, les appels externes, l'accessibilité des commandes, et les questions de code public ou de licence. Liste séparément les fichiers de l'extension et les données persistées. Explique ce dont une autre personne aurait besoin et ce qui ne doit pas être partagé. Aucun commit, push, demande de tirage, téléversement de journaux ou publication. Signale explicitement les inconnues au lieu de les combler.
```

## Résultat attendu

Le résultat de cet atelier est un jugement écrit, pas un état du tableau.

* Vous avez lu la vue des modifications vous-même et vous pouvez relier au moins
  un fichier à un comportement observé.
* Vous avez relevé au moins une affirmation de l'agent que vous n'avez pas pu
  relier à une observation.
* Les invariants des ateliers précédents tiennent toujours : le total est
  inchangé depuis votre dernier relevé, et les identifiants sont restés stables
  et uniques.
* Vous avez répondu séparément aux deux questions de partage.

Aucun total attendu, aucun identifiant imposé, aucun libellé affiché n'entre
dans cette vérification.

## Barres d'acceptation

Même budget de temps, résultats différents.

* Barre débutante : une observation de revue écrite et une limite de partage
  nommée.
* Barre intermédiaire : en plus, vous inspectez l'artefact JSON persisté, vous
  proposez par écrit une vérification de non-régression qu'une autre personne
  pourrait rejouer, et vous relisez la décision de partage de votre binôme.

L'affectation a eu lieu à l'inscription et votre place en salle la reflète.

## Si quelque chose bloque

* La session semble perdue : retrouvez-la dans la liste des sessions du projet.
  Une commande de redémarrage de session conserve l'historique de conversation;
  cela ne récupère pas l'état d'un tableau.
* N'utilisez jamais une réinitialisation, un effacement, une suppression de
  session ou une suppression d'artefact comme moyen de reprise.
* Si le canevas reste indisponible, préservez les fichiers en l'état et signalez
  l'étape qui a échoué. Le diagnostic se fait après la séance.

## Limites

Le code généré reste soumis à l'avertissement sur les correspondances avec du
code public, y compris lorsque la politique de blocage est active. Une revue
assistée complète la revue humaine et ne la remplace pas; elle ne constitue
aucune certification.

Ne décrivez pas ce canevas comme prêt pour la production, révisé sur le plan des
licences, sécurisé, accessible ou conforme aux exigences d'une organisation.
Partager un dépôt n'établit ni modification simultanée, ni synchronisation
automatique entre plusieurs personnes.

Données fictives uniquement, dans le tableau comme dans vos invites. Aucune
donnée opérationnelle, de défense, de citoyens, de personnel, propriétaire ou
personnelle. Aucun logo d'organisation cliente, et aucune affirmation
d'approbation ni de conformité : les exemples d'organisations restent
illustratifs. Aucun commit, aucun envoi distant, aucune demande de tirage,
aucun téléversement de journaux, aucun déploiement.

Si la revue vous revient en anglais, ou mêlant les deux langues, consignez-le
comme une observation. C'est une donnée sur ce que la consigne de langue
contrôle, pas un défaut, et aucune vérification de cette section ne dépend d'une
chaîne affichée.

## Étape suivante

La section 6 se déroule en groupe. Gardez sous la main vos inconnues écrites :
c'est ce qui alimente le bilan. Les
[Ressources]({{ '/fr/ressources/' | relative_url }}) recensent la documentation
officielle et la liste complète de ce qui n'a pas été vérifié.
