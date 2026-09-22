---
title: Ateliers
description: Les quatre ateliers pratiques du parcours français, l'oracle indépendant de la langue, les seuils d'abandon et les deux barres d'acceptation.
lang: fr
translation_key: labs-index
lang_ref: /labs/
nav_order: 3
has_children: true
covers:
  - synthetic-data-only
  - no-endorsement
  - scope-boundaries
  - unrehearsed-proposal-notice
  - review-dependencies-before-run
  - delta-and-invariant-oracle
  - abort-threshold
  - learner-decision
  - human-review-required
  - track-acceptance-bars
---

# Ateliers

Quatre ateliers, un seul tableau porté du début à la fin. Chacun correspond à
une section chronométrée du parcours français et demande une décision précise,
pas seulement une invite collée.

| Atelier | Section | Durée | Décision qui vous revient |
|---------|---------|-------|---------------------------|
| [00 - Session et plan]({{ '/fr/labs/lab-00-setup/' | relative_url }}) | 2 | 15 min | Retirer un élément du plan proposé et justifier ce retrait. |
| [01 - Créer et utiliser le canevas]({{ '/fr/labs/lab-01-create-canvas/' | relative_url }}) | 3 | 35 min | Approuver ou refuser les dépendances signalées, avant toute exécution. |
| [02 - Améliorer une exigence]({{ '/fr/labs/lab-02-refine-canvas/' | relative_url }}) | 4 | 15 min | Choisir quel écart corriger en premier. |
| [03 - Vérifier et transmettre]({{ '/fr/labs/lab-03-verify-share/' | relative_url }}) | 5 | 10 min | Juger si la validation générée constitue une preuve suffisante. |

Le total de ces quatre ateliers est de soixante-quinze minutes. Les quinze
minutes restantes appartiennent aux sections 1 et 6, qui se déroulent en groupe.

## L'oracle : écarts et invariants

Chaque canevas généré est différent. Un critère d'acceptation exprimé en total
fixe déclarerait en échec des implémentations parfaitement correctes, et exiger
la saisie d'un identifiant explicite imposerait une forme d'interface que
personne ne concevrait ainsi dans la vraie vie.

Les vérifications portent donc sur des écarts et des invariants, jamais sur des
valeurs absolues ni sur des chaînes affichées.

| Point de contrôle | Ce qui est vérifié | Ce qui n'est jamais vérifié |
|-------------------|--------------------|-----------------------------|
| Référence initiale | Vous relevez votre propre total observé et vos propres compteurs par état. | Que ce total corresponde à une valeur attendue. |
| Ajout par l'interface | Le total augmente d'exactement un, et la nouvelle tâche est visible avec un identifiant unique. | Un identifiant précis, un libellé, ou la disposition du formulaire. |
| Lecture par l'agent | L'agent rapporte le même identifiant et le même compte que ceux que vous voyez. | Une formulation précise ou un nom de capacité. |
| Déplacement par l'agent | L'état d'origine diminue d'un, l'état de destination augmente d'un, le total ne change pas. | Quelle tâche a été déplacée, ni la répartition finale. |
| Filtre | Le nombre visible est inférieur ou égal au total; le total et les données stockées ne changent pas; le retrait du filtre restaure le nombre visible précédent. | Un nombre visible exact. |

Cet oracle est indépendant de la langue parce qu'il porte sur des valeurs
machine et sur des variations, pas sur du texte affiché. Aucune vérification de
ce parcours ne réussit ou n'échoue sur une chaîne traduite.

## Sortie en langues mêlées

Vos invites sont en français. Cela ne contraint pas la langue de tout ce que
l'agent produit. Vous verrez probablement cohabiter des libellés français, des
identifiants anglais, des messages d'erreur anglais et des commentaires de code
anglais.

Traitez cela comme un exercice d'observation, pas comme un défaut. La question
utile n'est pas « pourquoi est-ce en anglais », c'est « quelles parties de la
sortie générée une consigne de langue contrôle-t-elle réellement ». C'est une
observation transférable à tout travail avec un agent.

## Invites proposées, non répétées

Chaque bloc d'invite de ces pages porte une mention visible. Elle dit la même
chose partout : l'invite est une proposition qui n'a jamais été exécutée en
atelier, et les noms de capacités générés ne sont pas garantis. Les exemples de
la documentation sont illustratifs; inspectez les capacités que votre canevas
produit réellement.
## Réviser les dépendances avant toute exécution

L'invite de création de l'atelier 01 demande à l'agent d'énumérer chaque
dépendance et chaque étape d'installation ou de compilation, puis d'attendre
votre approbation au lieu d'installer quoi que ce soit lui-même.

Un agent qui signale une dépendance et s'arrête se comporte correctement. Le
traiter comme un échec d'atelier enseignerait l'inverse de l'habitude que cet
atelier existe pour construire. Vous approuvez, ou vous refusez et vous basculez
vers le canevas de référence.
## Seuils d'abandon

Le chronomètre démarre à l'envoi de l'invite de création, en section 3. Ces
seuils appartiennent à l'équipe d'animation, mais vous devez les connaître pour
ne pas vivre une bascule comme un échec personnel.

| Temps écoulé | Condition | Action |
|--------------|-----------|--------|
| T+6 | Aucun panneau de canevas pour une personne | Bascule immédiate vers le canevas de référence. |
| T+6 | Plus du quart du groupe bloqué | Bascule de toute la salle vers le canevas de référence, en exercice guidé. |
| T+10 | Canevas présent mais inutilisable | Une seule tentative de correction ciblée. |
| T+13 | Toujours inutilisable | Arrêt ferme, bascule vers le canevas de référence et mise en binôme. |

La règle qui gouverne tout le reste : personne ne prend plus d'une section de
retard. Une bascule vers un artefact connu est un chemin de reprise; un
dépannage en direct n'en est pas un.

## Les deux barres d'acceptation

Chaque atelier publie deux barres nommées. Elles tiennent dans le même budget de
temps et diffèrent par le résultat produit, pas par la quantité de lecture.

* Barre débutante : vous produisez un canevas utilisable et la démonstration
  qu'une action humaine et une action de l'agent portent sur le même état.
* Barre intermédiaire : vous produisez en plus un invariant vérifié et une trace
  écrite réutilisable, et vous révisez le travail de la personne assise à côté
  de vous.

L'affectation à un parcours se fait à l'inscription, sur la base d'une
auto-évaluation déclarée. Elle ne se décide pas pendant la séance. Le placement
en salle suit cette affectation : chaque table réunit une personne du parcours
intermédiaire et une personne du parcours débutant, pour que le parcours
intermédiaire crée de la capacité de révision au lieu d'ajouter du travail.

## Limites valables dans les quatre ateliers

* Données fictives uniquement. Aucune donnée opérationnelle, de défense, de
  citoyens, de personnel, propriétaire ou personnelle, y compris dans le texte
  que vous saisissez dans le tableau.
* Aucun service externe, aucun secret, aucun module complémentaire, aucun
  commit, aucun envoi distant, aucune demande de tirage, aucun déploiement.
* Aucun logo d'organisation cliente, aucune affirmation d'approbation ni de
  conformité.
* Un titre de tâche est une donnée. Il n'est ni du HTML, ni une instruction
  adressée à l'agent.
* Une personne lit et accepte ce que l'agent produit. La formulation d'une
  invite n'est pas un contrôle de sécurité, et les compétences héritées, les
  serveurs MCP et les approbations d'outils restent actifs dans votre session.

## Invite de reprise commune

Utilisez-la après un résultat inattendu, en y joignant le symptôme observé et
vos dernières valeurs relevées. C'est une demande de diagnostic, pas une
garantie d'annulation.

Proposition non répétée. Cette invite n'a jamais été exécutée en atelier, et
les noms de capacités générés ne sont pas garantis.

```text
Suspends les modifications. Compare l'état réel du canevas avec mon dernier point de contrôle observé. Identifie le plus petit écart et les fichiers ou capacités concernés. Ne réinitialise rien, ne régénère rien, ne supprime rien, n'installe rien, ne publie rien et n'écrase aucune donnée. Propose une correction ciblée et une vérification de son résultat, puis attends mon autorisation. Si tu ne peux pas consulter l'état, indique-le.
```

Ne traitez jamais une réinitialisation ou une régénération comme une annulation.
Préservez le dernier état observé, diagnostiquez le plus petit écart, puis
demandez une correction ciblée.
