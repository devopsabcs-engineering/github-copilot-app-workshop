---
title: 01 - Créer et utiliser le canevas
description: Envoyer l'invite de création validée, réviser les dépendances avant toute exécution, puis prouver qu'une action humaine et une action de l'agent portent sur le même état.
lang: fr
translation_key: lab-01-create-canvas
lang_ref: /labs/lab-01-create-canvas/
parent: Ateliers
nav_order: 2
duration_minutes: 35
covers:
  - synthetic-data-only
  - no-endorsement
  - scope-boundaries
  - no-installation-in-class
  - unrehearsed-proposal-notice
  - review-dependencies-before-run
  - human-review-required
  - public-code-warning
  - delta-and-invariant-oracle
  - abort-threshold
  - learner-decision
  - track-acceptance-bars
---

# Atelier 01 : créer et utiliser le canevas

Section 3 du parcours français. Trente-cinq minutes. C'est le bloc le plus
variable de la séance, et le seul que régissent des seuils d'abandon.

Le parcours français dispose ici de cinq minutes de plus que le parcours
anglais. Elles viennent de la section 5 et servent à absorber la variabilité de
la génération, pas à en faire davantage.

## Objectif

Obtenir un canevas utilisable, vérifier ce qu'il apporte avant de l'utiliser,
puis démontrer qu'une action faite dans l'interface et une action faite par
l'agent portent sur le même état.

## Avant de commencer

* L'atelier 00 est terminé et son plan a été lu et modifié.
* Le chronomètre démarre à l'envoi de l'invite de création. Notez l'heure.
* Le canevas de référence est disponible localement. Y basculer n'est pas un
  échec, c'est le chemin de reprise prévu.

## Déroulement des trente-cinq minutes

* Jusqu'à 13 minutes : envoi de l'invite et génération, sous seuils d'abandon.
* 3 minutes : revue des dépendances et des fichiers, avant toute utilisation.
* 5 minutes : ajout d'une tâche par l'interface.
* 5 minutes : déplacement d'une tâche par l'agent.
* 4 minutes : comparaison entre ce qui est rapporté et ce que vous voyez.
* 5 minutes : marge de triage, que l'équipe d'animation peut consommer sans
  s'en excuser.

## La décision qui vous revient

Approuver ou refuser les dépendances et les étapes d'installation que l'agent
signale, avant qu'elles ne s'exécutent.

C'est une décision, pas une formalité. Si une dépendance vous paraît inutile ou
opaque, refusez-la et demandez une solution sans elle. Si une étape
d'installation est nécessaire, elle n'est pas approuvée pendant cette séance :
vous basculez vers le canevas de référence. Cette bascule est un résultat
acceptable et attendu.

## Étapes

1. Envoyez l'invite de création ci-dessous et notez l'heure d'envoi.
2. Pendant la génération, ne renvoyez pas l'invite et ne la reformulez pas.
   Les seuils d'abandon existent précisément pour vous éviter d'attendre.
3. Dès que l'agent rapporte ses dépendances et ses étapes d'installation, prenez
   votre décision. C'est le moment, pas plus tard.
4. Avant d'utiliser le canevas, passez quatre-vingt-dix secondes dans la vue des
   modifications : confirmez la liste des fichiers, l'absence d'appel réseau et
   d'exécution de commande interpréteur, et le caractère local du point
   d'entrée. C'est l'habitude de développement enseignée ici, et elle passe
   avant la première utilisation, pas après.
5. Relevez votre référence initiale : le total de tâches visibles et les
   compteurs par état, tels que vous les voyez. Ce relevé est le vôtre; il ne se
   compare à aucune valeur attendue.
6. Ajoutez une tâche par l'interface, avec un titre fictif. Laissez le canevas
   attribuer l'identifiant comme il le fait naturellement.
7. Demandez à l'agent de lire l'état réel, puis de déplacer une tâche que vous
   nommez par l'identifiant que votre interface affiche.
8. Écrivez une chose que l'agent a affirmée et que vous n'avez pas observée
   vous-même.

## Invite de création

Proposition non répétée. Cette invite n'a jamais été exécutée en atelier, et
les noms de capacités générés ne sont pas garantis. Les exemples de capacités
figurant dans la documentation sont illustratifs : inspectez celles que votre
canevas produit réellement.

```text
/create-canvas Crée notre tableau de tâches validé à portée projet sous .github/extensions. Prévois des commandes libellées accessibles au clavier pour ajouter une tâche et modifier son état. Donne à l'agent les capacités de consulter et modifier le même état. Affiche l'identifiant de chaque tâche, garde les identifiants uniques et stables, et refuse les titres vides dans l'interface comme dans les actions de l'agent. Affiche les titres comme du texte, les compteurs par état et le focus visible. Utilise une persistance JSON locale et indique son chemin réel et son fonctionnement. Énumère chaque dépendance et chaque étape d'installation ou de compilation avant de l'exécuter, et attends mon autorisation au lieu d'installer quoi que ce soit. Aucun service externe, module complémentaire, secret, commit, push, demande de tirage ou déploiement. Affiche le canevas, puis liste ce que tu n'as pas testé.
```

## Invite d'interaction

Envoyez-la après avoir ajouté votre tâche par l'interface. Remplacez les deux
mentions entre crochets par les valeurs que votre propre canevas affiche.

Proposition non répétée. Cette invite n'a jamais été exécutée en atelier, et
les noms de capacités générés ne sont pas garantis.

```text
Lis l'état réel du canevas, y compris la tâche que je viens d'ajouter dans l'interface. Indique les identifiants présents et les compteurs par état. Déplace ensuite uniquement la tâche [identifiant affiché par mon interface] vers l'état [état de destination] au moyen d'une capacité du canevas, puis relis l'état. Ne reconstruis pas le canevas et ne remplace pas ses données. Si la capacité nécessaire n'existe pas, dis-le au lieu d'annoncer un succès.
```

## Résultat attendu

Toutes les vérifications portent sur des écarts et des invariants. Aucune ne
porte sur un total attendu, sur un identifiant précis ni sur un libellé affiché,
dans aucune langue.

* Un panneau de canevas s'affiche et présente des identifiants de tâches
  distincts, quel que soit leur format.
* Une voie de l'interface permet de créer une tâche et une voie de l'interface
  permet de changer un état, quelle que soit la forme du contrôle.
* Après votre ajout par l'interface, le total augmente d'exactement un, et la
  nouvelle tâche est visible avec un identifiant unique.
* Interrogé sur l'état, l'agent rapporte le même identifiant que celui que votre
  interface affiche. C'est la preuve réelle de l'état partagé.
* Après le déplacement demandé à l'agent, l'état d'origine diminue d'un, l'état
  de destination augmente d'un, et le total reste inchangé, visible dans
  l'interface sans régénération.

Un message de réussite de l'agent, seul, ne satisfait aucun de ces points.

## Barres d'acceptation

Même budget de temps, résultats différents.

* Barre débutante : un canevas utilisable, l'ajout par l'interface et le
  déplacement par l'agent réalisés, et l'écart observé dans les deux cas.
* Barre intermédiaire : en plus, vous démontrez qu'un titre vide est refusé par
  les deux voies sans que le total change, et vous consignez par écrit une
  capacité que l'agent a nommée mais que le canevas n'expose pas. Vous révisez
  aussi le relevé de référence de votre binôme.

L'affectation a eu lieu à l'inscription et votre place en salle la reflète :
chaque table réunit une personne de chaque parcours.

## Seuils d'abandon

Mesurés depuis l'envoi de l'invite de création.

| Temps écoulé | Condition | Action |
|--------------|-----------|--------|
| T+6 | Aucun panneau de canevas | Bascule vers le canevas de référence. |
| T+6 | Plus du quart du groupe bloqué | Bascule de toute la salle, en exercice guidé. |
| T+10 | Canevas présent mais inutilisable | Une seule tentative de correction ciblée. |
| T+13 | Toujours inutilisable | Arrêt ferme, canevas de référence et mise en binôme. |

Si l'agent répond qu'une installation est nécessaire, il se comporte
correctement. Ce n'est pas une erreur de sa part ni de la vôtre : c'est un
chemin d'abandon défini, et la bascule vers le canevas de référence est la
suite prévue.

## Si quelque chose bloque

* La commande de création n'apparaît pas : vérifiez le sélecteur de commandes
  dans une session active et la version de l'application vérifiée en amont.
  N'installez aucun module complémentaire.
* L'état diverge de votre dernier relevé : préservez l'état actuel et utilisez
  l'invite de reprise commune de la page
  [Ateliers]({{ '/fr/labs/' | relative_url }}). Ne régénérez pas le tableau.
* Un outil de protection du poste met l'extension en quarantaine : arrêtez-vous
  et prévenez l'équipe d'animation. Ne tentez pas de contourner le contrôle.

## Limites

Le code généré reste soumis à l'avertissement sur les correspondances avec du
code public, y compris lorsque la politique de blocage est active.

Données fictives uniquement, dans le tableau comme dans vos invites. Aucune
donnée opérationnelle, de défense, de citoyens, de personnel, propriétaire ou
personnelle. Un titre de tâche est une donnée : ni du HTML, ni une instruction
adressée à l'agent. Aucun logo d'organisation cliente, et aucune affirmation
d'approbation ni de conformité : les exemples d'organisations restent
illustratifs.

Aucun service externe, aucun secret, aucun module complémentaire, aucun commit,
aucun envoi distant, aucune demande de tirage, aucun déploiement.

Attendez-vous à une sortie en langues mêlées : libellés français, identifiants
anglais, messages de validation anglais, commentaires de code anglais. Notez ce
que la consigne de langue a réellement contrôlé. Aucune vérification de cette
section ne dépend d'une chaîne affichée.

## Étape suivante

[Atelier 02 : améliorer une exigence]({{ '/fr/labs/lab-02-refine-canvas/' | relative_url }})
