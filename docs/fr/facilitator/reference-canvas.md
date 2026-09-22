---
title: Canevas de référence
description: Construire, réviser et déposer l'artefact de reprise sous forme de répertoire copiable plutôt que de captures d'écran.
lang: fr
translation_key: facilitator-reference-canvas
lang_ref: /facilitator/reference-canvas/
parent: Trousse d'animation
nav_order: 3
covers:
  - review-dependencies-before-run
  - human-review-required
  - delta-and-invariant-oracle
  - persistence-not-guaranteed
  - public-code-warning
  - synthetic-data-only
  - unrehearsed-proposal-notice
---

# Canevas de référence

Toutes les voies de reprise de la feuille de route aboutissent ici. Une personne dont la génération échoue, dépasse le temps imparti ou produit un tableau dépourvu des commandes attendues reçoit cet artefact et poursuit en pratique. Un mécanisme de reprise qui n'a pas été construit n'est pas un mécanisme de reprise : c'est pourquoi il s'agit du premier livrable à produire et d'une exigence bloquante sur la [page des points de contrôle]({{ '/fr/facilitator/preflight/' | relative_url }}).

> [!CAUTION]
> Aucun canevas de référence n'existe à ce jour. Rien sur cette page ne décrit un artefact construit, révisé, déposé ou chargé. La page décrit ce qu'il faut produire et les vérifications qui le produisent.

## Livrez un répertoire, pas des captures d'écran

Déposez l'artefact sous forme de répertoire `.github/extensions` copiable, qu'une personne dépose dans son propre dossier de projet pour continuer. Les captures d'écran constituent le troisième recours, pas le premier : un atelier pratique payant qui se dégrade en observation d'images a livré autre chose que ce pour quoi les personnes se sont inscrites.

Le répertoire est déposé en fichier local sur chaque appareil pendant la phase préalable, sur un support qui survit à une panne réseau. Un dépôt interne que le mandataire de l'entreprise peut bloquer le jour même ne constitue pas un dépôt valable.

## Construisez-le en premier

Produisez le canevas de référence avant les ateliers, les diaporamas et la répétition chronométrée, car les trois se calent dessus.

1. Créez-le dans un projet jetable approuvé, avec des données fictives uniquement, sans contenu de clientèle, de citoyens, de personnel ni de contenu propriétaire.
2. Amorcez-le à partir du jeu de quatre tâches utilisé par les ateliers, pour qu'une personne qui bascule retrouve des identifiants et un vocabulaire familiers.
3. Consignez ce que vous avez observé pendant la construction : version de l'application, système d'exploitation et architecture, politique du compte, modèle, environnement d'exécution, durée chronométrée, fichiers générés et noms des capacités réellement exposées par l'agent. Les noms de capacités figurant dans les exemples publiés sont illustratifs. Inspectez les vrais.
4. N'installez rien et ne contournez aucun contrôle d'organisation pour y parvenir. Si l'artefact ne peut pas être produit dans le cadre approuvé, c'est un constat à remonter au commanditaire, pas un obstacle à contourner.

## Révisez avant de déposer

Cet artefact se retrouve sur chaque appareil : il reçoit donc, une fois et correctement, la révision que les personnes apprenantes apprennent à faire.

* Lisez la vue des modifications fichier par fichier et reliez chaque fichier à un comportement observable à l'écran.
* Confirmez que le point d'entrée est local et qu'aucun appel réseau, aucune exécution de commande et aucune manipulation de justificatif n'apparaît dans le code généré.
* Lisez la liste des dépendances. Approuvez chacune délibérément ou supprimez le besoin. Rien ne s'installe parce que l'agent l'a demandé.
* Cherchez une correspondance avec du code public. Une correspondance peut apparaître même sous une politique de blocage. Arrêtez-vous plutôt que de bâtir sur cette sortie, et consignez ce que vous avez trouvé.
* Confirmez que le tableau satisfait les écarts et les invariants utilisés par les ateliers : un ajout par l'interface fait varier le total de un, un déplacement par l'agent retire un à un état et en ajoute un à un autre sans changer le total, et un filtre ne modifie que ce qui est visible.
* Confirmez que les titres vides sont refusés par l'interface comme par les actions de l'agent, que les identifiants restent uniques et stables, et que les titres s'affichent comme du texte et non comme du balisage ou des instructions.

Consignez le résultat de la révision à côté du répertoire déposé. L'exigence G01 se referme sur ce compte rendu, pas sur l'existence du répertoire.

## Quatre états enregistrés

Les sections 4 et 5 supposent toutes deux que la section 3 s'est terminée sur un tableau exploitable. Déposez quatre copies du répertoire, une par point de contrôle, pour pouvoir placer une personne dans n'importe quelle section ultérieure avec le bon état en moins d'une minute :

| État | Contenu | Utilisé quand |
| --- | --- | --- |
| A | Tableau créé, tâches initiales présentes, aucune modification | Aucun tableau fonctionnel n'est jamais arrivé |
| B | Une tâche ajoutée par l'interface | L'interaction par l'interface n'a pas abouti |
| C | Une tâche déplacée par l'agent à partir de B | Le déplacement par l'agent n'a pas abouti, y compris à l'injection de T+20 |
| D | Filtre présent et retirable | Une personne entre en section 5 sans amélioration fonctionnelle |

Cela transforme une panne en cascade en panne locale, et le coût est faible une fois le premier répertoire produit.

## Répétez le chargement

Produire l'artefact ne garantit pas de savoir le remettre sous pression. Le geste qui intègre une extension préparée dans une session existante n'a pas été vérifié : répétez-le explicitement et notez ce que vous avez fait.

Chronométrez la remise. Si basculer une personne vers le canevas de référence prend plus longtemps que la marge du temps fort concerné, l'horloge d'abandon de la [feuille de route]({{ '/fr/facilitator/running-the-session/' | relative_url }}) ne joue pas son rôle et les budgets doivent être revus.

Répétez la remise en français comme en anglais. Le parcours français porte le risque le plus élevé et n'a jamais été observé.

## Ce que le canevas de référence n'établit pas

* Il n'établit pas que le tableau généré par une personne se comportera de la même façon. Les sorties générées varient, d'où des critères exprimés en écarts et en invariants.
* Il n'établit pas que l'état survit à une fermeture suivie d'une réouverture. La persistance est une implémentation demandée, pas une garantie, et aucun geste de réouverture n'a été établi. Vérifiez la réouverture séparément, documentez le geste exact testé, et considérez le point de contrôle comme non vérifié d'ici là.
* Il n'établit pas que le tableau est partagé entre collègues. La portée projet est une portée de partage de code, pas une collaboration multiutilisateur en direct.
* Il n'établit aucune approbation. Exécuter ce code sur un appareil géré exige toujours l'autorisation écrite consignée en G13.
