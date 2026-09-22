---
title: 02 - Améliorer une exigence
description: Rédiger sa propre demande de modification ciblée, ajouter un filtre de priorité et vérifier que filtrer change la visibilité sans toucher aux données.
lang: fr
translation_key: lab-02-refine-canvas
parent: Ateliers
grand_parent: Français
nav_order: 3
duration_minutes: 15
covers:
  - synthetic-data-only
  - no-endorsement
  - scope-boundaries
  - unrehearsed-proposal-notice
  - human-review-required
  - delta-and-invariant-oracle
  - learner-decision
  - track-acceptance-bars
---

# Atelier 02 : améliorer une exigence

Section 4 du parcours français. Quinze minutes.

## Objectif

Demander exactement une modification circonscrite, un filtre de priorité, et
vérifier un invariant : filtrer change ce qui est visible, jamais ce qui est
stocké.

## Avant de commencer

* Vous disposez d'un canevas utilisable, le vôtre ou celui de référence.
* Vous avez relevé, avant de commencer, le total actuel et les compteurs par
  état. C'est votre point de comparaison, et lui seul.

## Déroulement des quinze minutes

* 3 minutes : vous rédigez votre propre demande.
* 5 minutes : envoi et génération de la modification.
* 5 minutes : vérification de l'invariant.
* 2 minutes : retrait du filtre et contrôle du retour à l'état visible
  précédent.

## La décision qui vous revient

Choisir quel écart corriger en premier lorsque le filtre fait plus que ce que
vous avez demandé.

C'est le cas le plus fréquent : le filtre arrive avec un tri, un compteur
supplémentaire, ou une modification d'état non demandée. Vous ne pouvez pas tout
reprendre en cinq minutes. Nommez l'écart le plus important, corrigez-le, et ne
formulez pas de seconde demande avant d'avoir vérifié la première.

## Étapes

1. Rédigez vous-même la demande. Cette section porte sur la formulation d'une
   demande ciblée : recevoir l'invite toute faite en annulerait l'intérêt.
   Énoncez l'invariant dès le départ, plutôt que de le vérifier après coup.
2. Si vous butez pendant plus de trois minutes, utilisez l'invite de secours
   ci-dessous. Elle est un filet, pas le point de départ.
3. Envoyez une seule demande. Ne groupez pas plusieurs améliorations.
4. Appliquez le filtre. Relevez le nombre visible et comparez-le au total.
5. Vérifiez que les données stockées n'ont pas changé.
6. Retirez le filtre et confirmez le retour au nombre visible précédent.
7. Parcourez les nouvelles commandes au clavier et observez le focus. C'est une
   vérification ponctuelle, pas un audit d'accessibilité.

## Invite de secours

À n'utiliser qu'après trois minutes de rédaction personnelle.

Proposition non répétée. Cette invite n'a jamais été exécutée en atelier, et
les noms de capacités générés ne sont pas garantis.

```text
Ajoute uniquement un filtre sur la priorité haute et une commande pour retirer ce filtre, au canevas existant. Conserve toutes les tâches, leurs identifiants, leurs titres, leurs priorités et leurs états sans aucune modification. Rends les commandes utilisables au clavier avec un focus visible. Affiche le nombre de tâches visibles et le total. Le filtrage ne doit supprimer aucune donnée ni modifier un état. Explique les différences apportées et indique ce que tu n'as pas testé. N'installe aucune dépendance et n'effectue aucune modification distante.
```

## Résultat attendu

Vérifiez l'invariant, pas un nombre ni un libellé.

* Le nombre de tâches visibles est inférieur ou égal au total.
* Le total ne change pas et les données stockées ne changent pas : mêmes
  identifiants, mêmes titres, mêmes priorités, mêmes états.
* Le retrait du filtre restaure exactement l'ensemble visible précédent.
* Les commandes ajoutées sont atteignables au clavier et le focus est visible.

Aucun nombre visible exact ne fait partie de la vérification. Le libellé du
contrôle n'en fait pas partie non plus : une commande qui restreint
l'affichage satisfait le critère, quelle que soit la façon dont elle est
nommée et dans quelque langue que ce soit.

## Barres d'acceptation

Même budget de temps, résultats différents.

* Barre débutante : le filtre est en place, l'invariant est vérifié et le
  retrait du filtre restaure l'ensemble visible précédent.
* Barre intermédiaire : en plus, vous produisez une vérification écrite du cas
  où aucune tâche ne correspond au filtre, et vous distinguez explicitement le
  nombre filtré du total dans cette vérification. Vous relisez ensuite
  l'invariant relevé par votre binôme.

L'affectation a eu lieu à l'inscription et votre place en salle la reflète.

## Si quelque chose bloque

* Le filtrage modifie les données : arrêtez-vous. Comparez avec votre dernier
  relevé, demandez une correction ciblée, puis refaites exactement la même
  vérification. Ne régénérez pas le tableau.
* La demande a produit plus que ce qui était demandé : c'est votre décision qui
  s'applique. Un seul écart, corrigé et vérifié, vaut mieux que trois écarts
  signalés.
* Les libellés arrivent en anglais ou mêlent les deux langues : ce n'est pas un
  défaut et cela ne fait échouer aucune vérification.

## Limites

Données fictives uniquement, dans le tableau comme dans vos invites. Aucune
donnée opérationnelle, de défense, de citoyens, de personnel, propriétaire ou
personnelle. Aucun logo d'organisation cliente, et aucune affirmation
d'approbation ni de conformité : les exemples d'organisations restent
illustratifs.

Aucun service externe, aucun secret, aucun module complémentaire, aucun commit,
aucun envoi distant, aucune demande de tirage, aucun déploiement. Une
vérification ponctuelle au clavier ne permet d'affirmer aucune conformité en
matière d'accessibilité.

## Étape suivante

[Atelier 03 : vérifier et transmettre]({{ '/fr/labs/lab-03-verify-share/' | relative_url }})
