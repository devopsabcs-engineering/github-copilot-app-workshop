---
title: Français
description: Atelier pratique de quatre-vingt-dix minutes sur l'application GitHub Copilot et les extensions de canevas, conçu et livré en français.
lang: fr
translation_key: home
nav_order: 90
has_children: true
covers:
  - synthetic-data-only
  - no-endorsement
  - scope-boundaries
  - telemetry-disclosure
  - no-installation-in-class
  - human-review-required
  - delta-and-invariant-oracle
  - track-acceptance-bars
---

# Atelier sur l'application GitHub Copilot

Quatre-vingt-dix minutes, une seule langue parlée, les mains sur un tableau de
tâches d'équipe fictif. Vous planifiez une extension de canevas, vous la faites
générer, vous interagissez avec elle par l'interface et par l'agent, puis vous
vérifiez vous-même ce qui a réellement changé.

Cet atelier s'adresse à des personnes qui développent et qui connaissent déjà un
peu GitHub Copilot. Il demande peu de code écrit à la main, mais il exige
beaucoup de jugement : lire un plan avant de l'accepter, approuver ou refuser des
dépendances, distinguer ce que l'agent affirme de ce que vous observez.

## Déroulement

Les durées ci-dessous sont celles du parcours français. Elles totalisent
quatre-vingt-dix minutes, comme le parcours anglais, mais elles ne sont pas
réparties de la même façon : la section 3 reçoit cinq minutes de plus, prises sur
la section 5.

| Section | Titre | Durée | Résultat observable |
|---------|-------|-------|---------------------|
| 1 | Découvrir l'application et fixer les limites | 10 min | Distinguer l'application, le canevas et le site publié; nommer les responsabilités de révision. |
| 2 | Démarrer une session et valider le plan | 15 min | Sélectionner le projet approuvé et le mode Plan; convenir des critères d'acceptation. |
| 3 | Créer et utiliser le tableau de tâches | 35 min | Créer le canevas, ajouter par l'interface, déplacer par l'agent, comparer l'état réel. |
| 4 | Améliorer une exigence à la fois | 15 min | Ajouter un filtre de priorité sans modifier les données des tâches. |
| 5 | Examiner, vérifier et préparer la transmission | 10 min | Inspecter les modifications, séparer le partage du code et celui de l'état. |
| 6 | Bilan et questions | 5 min | Expliquer les résultats observés, les limites restantes et une prochaine étape approuvée. |

Les sections 2 à 5 correspondent aux quatre pages d'atelier. Les sections 1 et 6
se déroulent en groupe, sans manipulation.

## Trois choses à ne pas confondre

L'application de bureau exécute des sessions. Une extension de canevas est une
surface qui vit à l'intérieur de cette application. Ce site est un support de
formation : il n'est ni l'une ni l'autre, et publier ces pages ne déploie aucun
canevas.

Trois modes de session sont documentés : Interactive, Plan et Autopilot. La
section 2 utilise délibérément le mode Plan, pour que vous lisiez une démarche
avant que quoi que ce soit ne soit généré.

## Comment les résultats sont vérifiés

Chaque critère d'acceptation de cet atelier est un écart ou un invariant. Aucun
n'est un total absolu, et aucun ne dépend d'un libellé affiché à l'écran.

Ce n'est pas une préférence de rédaction. Chaque canevas généré diffère : un
total attendu commun marquerait en échec un travail correct, et une
vérification écrite à partir d'un texte affiché échoue dès qu'un libellé est
renommé ou traduit. Vous relevez donc votre propre point de départ, puis vous
affirmez comment il change.

## Ce que l'atelier n'est pas

Ce n'est pas un cours sur Power Apps, sur Copilot Workspace ni sur Spark. Ce
n'est pas une formation sans code, et ce n'est pas un parcours de déploiement en
production. Le canevas que vous obtiendrez n'est ni révisé, ni sécurisé, ni
conforme, ni prêt pour un usage réel.

## Limites de la séance

Ces limites tiennent du début à la fin, sur chaque page et dans chaque atelier.

* Données fictives uniquement. Aucune donnée opérationnelle, de défense, de
  citoyens, de personnel, propriétaire ou personnelle n'entre dans une session.
* Aucun service externe, aucun secret, aucun module complémentaire, aucun commit,
  aucun envoi vers un dépôt distant, aucune demande de tirage, aucun déploiement.
* Aucun logo d'organisation cliente. Les exemples d'organisations sont
  illustratifs et ne constituent ni une approbation, ni une preuve de conformité.
* Le contenu produit par l'agent est une proposition. Une personne l'accepte, le
  corrige ou le refuse. Cette révision humaine n'est pas facultative.

## Traitement des données et journalisation

Le dépôt de l'application indique que des données de conversation peuvent être
collectées. Vous devez recevoir cet avis, ainsi que celui de votre organisation
commanditaire, avant d'ouvrir la première session. Un fichier stocké localement
ne prouve ni un traitement local, ni une région de traitement, ni une durée de
conservation, ni une garantie de résidence des données.

Si cet avis ne vous a pas été transmis, signalez-le avant de commencer plutôt que
pendant la section 3.

## Installation et connexion

Rien n'est installé pendant la séance. L'installation, la connexion et les
prérequis d'exécution sont réalisés et vérifiés à l'avance, sur l'appareil que
vous utiliserez réellement. Aucune minute du chronomètre ne leur est consacrée,
et une installation en classe n'est pas un chemin de reprise : c'est un motif
d'abandon avec bascule vers le canevas de référence.

Voir la page [Préalables]({{ '/fr/prerequis/' | relative_url }}) pour la liste
complète et les cas connus d'échec.

## Deux barres d'acceptation

Chaque atelier publie deux barres nommées, débutante et intermédiaire. Elles
occupent le même temps et diffèrent par le résultat produit, pas par la quantité
de lecture.

* Barre débutante : vous obtenez un canevas utilisable et vous démontrez qu'une
  action de l'interface et une action de l'agent portent sur le même état.
* Barre intermédiaire : vous obtenez en plus un invariant vérifié et une trace
  écrite réutilisable, et vous servez de réviseur pour la personne assise à côté
  de vous.

L'affectation se fait à l'inscription, à partir d'une auto-évaluation déclarée,
et non pendant la séance. Le placement suit cette affectation : chaque table
réunit une personne du parcours intermédiaire et une personne du parcours
débutant, de sorte que le parcours intermédiaire produise de la capacité de
révision plutôt que du travail supplémentaire.

## Sortie en langues mêlées

Une invite rédigée en français n'impose pas la langue de tout ce que l'agent
produit. Attendez-vous à voir cohabiter des libellés français, des identifiants
anglais, des messages de validation anglais et des commentaires de code anglais.

Ce n'est pas un défaut à corriger pendant l'atelier. C'est l'exercice
d'observation de la journée : repérer quelles parties de la sortie générée une
consigne de langue contrôle réellement. Aucune vérification de cet atelier ne
réussit ou n'échoue sur une chaîne affichée, dans aucune langue.

## Par où commencer

1. Lisez les [Préalables]({{ '/fr/prerequis/' | relative_url }}) et faites-les
   vérifier avant le jour de la séance.
2. Parcourez les [Ateliers]({{ '/fr/labs/' | relative_url }}) pour connaître les
   décisions qui vous seront demandées.
3. Récupérez le support de présentation dans les
   [Téléchargements]({{ '/fr/telechargements/' | relative_url }}).
4. Gardez les [Ressources]({{ '/fr/ressources/' | relative_url }}) ouvertes
   pendant la séance : c'est là que se trouve la documentation officielle.

## Ce qui n'a pas été testé

Aucune répétition en conditions réelles n'a encore eu lieu. La génération du
canevas, sa durée, ses dépendances, sa persistance et son comportement après
réouverture restent des prédictions. Aucune page de ce site n'affirme qu'un de
ces comportements fonctionne.
