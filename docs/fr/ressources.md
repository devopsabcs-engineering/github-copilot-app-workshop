---
title: Ressources
description: Documentation officielle, date de récupération des sources, avertissement sur le code public et liste explicite de ce qui n'a pas été vérifié.
lang: fr
translation_key: resources
lang_ref: /resources/
nav_order: 5
covers:
  - synthetic-data-only
  - no-endorsement
  - scope-boundaries
  - public-code-warning
  - persistence-not-guaranteed
---

# Ressources

Gardez cette page ouverte pendant la séance. Lorsque l'agent affirme quelque
chose sur le produit, c'est ici que vous vérifiez, et non dans la conversation
qui vient de produire l'affirmation.

## Documentation officielle

Toutes les adresses ci-dessous ont été récupérées le 2026-09-22. Cette date est
une date de consultation, pas une date de publication. La cadence de publication
de l'application est proche du quotidien et des libellés d'interface ont déjà
été renommés : revérifiez ces pages dans la semaine qui précède une séance.

| Sujet | Source |
|-------|--------|
| Présentation de l'application | <https://docs.github.com/en/copilot/concepts/agents/github-copilot-app> |
| Démarrage rapide | <https://docs.github.com/en/copilot/get-started/quickstart-copilot-app> |
| Extensions de canevas | <https://docs.github.com/en/copilot/how-tos/github-copilot-app/working-with-canvas-extensions> |
| Sessions d'agent | <https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions> |
| Personnalisation | <https://docs.github.com/en/copilot/how-tos/github-copilot-app/customize-github-copilot-app> |
| Commandes barre oblique | <https://docs.github.com/en/copilot/reference/github-copilot-app-reference/slash-commands> |

Ces pages sont en anglais. Aucune source consultée n'établit une couverture
francophone de l'interface de l'application, et un module d'apprentissage
disponible en français ne le démontre pas non plus.

## Code public et licences

Le code généré reste soumis à l'avertissement sur les correspondances avec du
code public. Cet avertissement s'applique même lorsque la politique de blocage
est active. Le traiter comme réglé parce qu'une politique existe est une erreur
de raisonnement, pas une simplification.

Concrètement, avant de réutiliser quoi que ce soit hors de la séance : faites
passer le code par le processus de licence et de revue de votre organisation.
L'assistance de révision proposée par l'outil complète la révision humaine, elle
ne la remplace pas et ne constitue aucune certification.

## Persistance et réouverture

La documentation du canevas décrit des artefacts JSON facultatifs pour l'état
persisté. Elle ne contient aucune section de réouverture, et aucune commande
universelle de réouverture n'a été établie.

Il n'existe donc pas de garantie de restauration. Une persistance demandée dans
une invite est une exigence d'implémentation, pas une propriété du produit. Le
parcours français ne comporte volontairement aucun point de contrôle de
réouverture : le comportement n'a pas été répété, et vérifier un comportement
non répété en classe consommerait du temps sans produire de preuve.

Le point de contrôle de réouverture reste un travail de suivi, à exécuter en
répétition avec un instantané de l'état préservé avant tout essai.

## Ce qui n'a pas été vérifié

Cette liste est aussi importante que la précédente. Rien de ce qui suit n'a été
observé, et aucune page de ce site ne l'affirme.

* La génération effective du canevas, sa durée, et le fait qu'elle aboutisse
  sans étape d'installation.
* Le fait que les invites proposées produisent des commandes fonctionnelles, un
  état partagé, une validation des saisies ou un filtre.
* La conservation de l'état après fermeture du panneau, redémarrage de la
  session ou redémarrage de l'application.
* Le fait qu'une autre personne puisse ouvrir l'extension partagée avec le même
  état et sans préparation supplémentaire.
* Toute forme de modification simultanée, de synchronisation automatique ou de
  permissions par carte.
* Toute conformité en matière d'accessibilité. Des vérifications ponctuelles au
  clavier ou au zoom ne constituent pas un audit.
* Toute région de traitement, durée de conservation, résidence de données,
  quota précis ou conformité propre à une organisation.

## Limites de réutilisation

Les exemples d'organisations cités dans cet atelier sont illustratifs. Ils ne
constituent ni une approbation, ni une affiliation, ni une preuve de conformité,
et aucun logo d'organisation cliente n'est utilisé. Tout le matériel repose sur
des données fictives : aucune donnée opérationnelle, de défense, de citoyens, de
personnel, propriétaire ou personnelle n'y figure.

Ne décrivez pas le canevas produit pendant la séance comme prêt pour la
production, révisé sur le plan des licences, sécurisé, accessible ou conforme
aux exigences d'une organisation.

## Voir aussi

* [Préalables]({{ '/fr/prerequis/' | relative_url }})
* [Ateliers]({{ '/fr/labs/' | relative_url }})
* [Téléchargements]({{ '/fr/telechargements/' | relative_url }})
