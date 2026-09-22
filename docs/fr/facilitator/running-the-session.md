---
title: Déroulement de la séance
description: Horloge d'abandon, décomposition par temps fort du bloc principal, encadrement, vagues décalées et règle du retard maximal d'une section.
lang: fr
translation_key: facilitator-running-the-session
lang_ref: /facilitator/running-the-session/
parent: Trousse d'animation
nav_order: 2
covers:
  - abort-threshold
  - delta-and-invariant-oracle
  - learner-decision
  - track-acceptance-bars
  - public-code-warning
  - persistence-not-guaranteed
  - unrehearsed-proposal-notice
---

# Déroulement de la séance

> [!IMPORTANT]
> Toutes les durées de cette page sont provisoires. Aucune n'a été observée. Ce sont des budgets servant de repère, pas des mesures. Remplacez chacune par la valeur la plus lente relevée au cours des deux répétitions chronométrées exigées en G02, et inscrivez à côté la date du remplacement. D'ici là, toute personne qui s'y fie se cale sur une estimation.

## Répartition française des durées

Le français dispose des mêmes quatre-vingt-dix minutes que l'anglais, réparties autrement. Le point de contrôle de réouverture de la section 5 est retiré, car la documentation du canevas ne décrit aucun geste de réouverture et le comportement n'a jamais été vérifié. Les cinq minutes ainsi libérées passent à la section 3, qui porte la variabilité de la génération et l'horloge d'abandon.

| Section | Titre | Français | Anglais |
| --- | --- | --- | --- |
| 1 | Découvrir l'application et fixer les limites | 10 min | 10 min |
| 2 | Démarrer une session et valider le plan | 15 min | 15 min |
| 3 | Créer et utiliser le tableau de tâches | 35 min | 30 min |
| 4 | Améliorer une exigence à la fois | 15 min | 15 min |
| 5 | Examiner, vérifier et préparer la transmission | 10 min | 15 min |
| 6 | Bilan et questions | 5 min | 5 min |

En section 5, annoncez le retrait plutôt que de le passer sous silence : la réouverture n'est pas démontrée, et un point de contrôle qui peut légitimement ne rien produire n'a pas sa place dans une séance payante.

## Encadrement et vagues de démarrage

Une personne à l'animation principale plus une personne de renfort mobile par tranche de six à huit personnes en pratique. Une seule personne pour vingt participantes et participants pendant un bloc de trente-cinq minutes forme une file d'attente qui ne se vide jamais. Attendez-vous à ce qu'environ une personne sur trois demande au moins une intervention en section 3.

Le plafond de participation et le nombre de renforts confirmés restent ouverts en OD-03. Ils ne sont pas inventés ici. Réglez-les avant l'ouverture des inscriptions.

Répartissez la salle en deux ou trois vagues et décalez l'envoi de l'invite de création de 90 secondes entre chaque vague. Cela ne coûte aucune minute de séance, aplatit la pointe de simultanéité sur une seule sortie réseau et transforme une panne collective en file de triage exploitable. Faites tourner un poste d'animation une vague en avance, pour que le premier tableau affiché soit celui de l'animation.

Les personnes de renfort disposent de cette page, de l'horloge d'abandon et de l'autorisation permanente de remettre le canevas de référence sans en référer à l'animation principale.

## Règle directrice

Personne ne prend plus d'une section de retard. Le diagnostic d'une panne individuelle est une activité d'après-séance. Une personne qui dépanne un poste n'anime plus l'atelier : la reprise consiste donc toujours à basculer vers un artefact connu, jamais à déboguer en direct.

## Décomposition par temps fort de la section 3

Le chronomètre part au moment de l'envoi de l'invite de création, pas quand la salle se calme. Des seuils d'abandon sans budget par temps fort ne mesurent rien : le bloc est donc décomposé ici, et les plafonds coïncident avec les lignes d'abandon de la section suivante.

Le budget est la durée attendue du temps fort. La marge est une réserve nommée que l'animation peut consommer sans se justifier. Le plafond est le temps écoulé auquel le temps fort doit être terminé.

Groupes francophones, trente-cinq minutes :

| Temps fort | Budget | Marge | Plafond |
| --- | --- | --- | --- |
| Décrire l'objectif et envoyer l'invite de création révisée | 2 min | 1 min | T+3 |
| La génération s'exécute ; personne ne note rien et tout le monde attend | 8 min | 2 min | T+13 |
| Lire les dépendances signalées par l'agent | 2 min | 0 min | T+15 |
| Approuver ou refuser, puis inspecter les modifications avant toute exécution | 1 min | 0 min | T+16 |
| Première interaction par l'interface : ajouter une tâche | 3 min | 1 min | T+20 |
| Déplacement d'une tâche entre états par l'agent | 5 min | 1 min | T+26 |
| Comparer ce que chaque côté rapporte avec ce qui est visible | 4 min | 1 min | T+31 |
| Réserve de triage nommée, gardée pour les cas longs | 0 min | 4 min | T+35 |

Groupes anglophones, trente minutes :

| Temps fort | Budget | Marge | Plafond |
| --- | --- | --- | --- |
| Décrire l'objectif et envoyer l'invite de création révisée | 2 min | 1 min | T+3 |
| La génération s'exécute ; personne ne note rien et tout le monde attend | 8 min | 2 min | T+13 |
| Lire les dépendances signalées par l'agent | 2 min | 0 min | T+15 |
| Approuver ou refuser, puis inspecter les modifications avant toute exécution | 1 min | 0 min | T+16 |
| Première interaction par l'interface : ajouter une tâche | 3 min | 1 min | T+20 |
| Déplacement d'une tâche entre états par l'agent | 4 min | 1 min | T+25 |
| Comparer ce que chaque côté rapporte avec ce qui est visible | 3 min | 0 min | T+28 |
| Réserve de triage nommée, gardée pour les cas longs | 0 min | 2 min | T+30 |

Les cinq minutes supplémentaires du français se dépensent après l'horloge d'abandon, sur les deux derniers temps forts et sur la réserve, et non sur la génération. Les seuils ci-dessous restent donc identiques dans les deux langues, ce qui évite à une personne bilingue de mémoriser deux jeux de nombres.

## Seuils d'abandon

Six lignes, toutes actives pendant la section 3. Les deux dernières constituent le mécanisme de reprise. Sans elles, une personne qui décroche une fois se trouve structurellement exclue des trente minutes restantes, puisque les sections 4 et 5 supposent toutes deux que la section 3 se termine sur un tableau exploitable.

| Temps écoulé | Condition | Geste |
| --- | --- | --- |
| T+6 | Aucun panneau de canevas n'est apparu pour une personne | Basculez-la immédiatement vers le canevas de référence. N'attendez pas le plafond du temps fort. |
| T+6 | Plus du quart de la salle est bloqué | Basculez toute la salle vers le canevas de référence et poursuivez en exercice guidé. Annoncez-le une fois, clairement, puis avancez. |
| T+10 | Un canevas existe mais reste inutilisable | Accordez exactement une tentative de correction ciblée. Aucune régénération. |
| T+13 | Toujours inutilisable après la tentative | Arrêt ferme. Ce qui existe devient la référence de cette personne. Sans tableau exploitable, elle reçoit le canevas de référence et travaille en binôme avec sa voisine ou son voisin. |
| T+20 | Les interactions de la section 3 sont incomplètes | Injectez l'état connu à quatre tâches du jeu de données et passez à la section 4 quoi qu'il arrive. Ne terminez pas les interactions d'abord. |
| Entrée en section 4 | Une personne sans tableau fonctionnel | Canevas de référence, sans exception, sans diagnostic supplémentaire pendant la séance. |

L'état injecté comporte les quatre tâches initiales, pas cinq. Les critères d'acceptation sont des écarts et des invariants mesurés à partir de la référence que chaque personne a relevée : aucune section ne dépend donc d'un total précis.

La régénération n'est jamais la reprise. Elle détruit le dernier état observé, seule preuve disponible sur ce qui a mal tourné. Conservez l'état, nommez le plus petit écart et demandez une seule correction ciblée.

## L'acceptation repose sur des écarts et des invariants

Vingt personnes produisent vingt tableaux différents. Certaines génèrent leurs propres identifiants, d'autres n'affichent les compteurs que dans la conversation, d'autres encore réalisent le changement d'état par une liste déroulante ou par des boutons. Comparer à un total attendu fixe signalerait comme des échecs des réalisations correctes : cela n'est donc pas fait ici.

| Point de contrôle | Vérifiez ceci | Ne vérifiez jamais cela |
| --- | --- | --- |
| Référence | La personne relève son propre total et ses compteurs par état | Que la référence vaut quatre |
| Ajout par l'interface | Le total augmente exactement de un et la nouvelle tâche est visible avec un identifiant unique | Un identifiant, un libellé ou une disposition de formulaire précis |
| Lecture de l'état par l'agent | L'agent rapporte l'identifiant et le compte que la personne voit à l'écran | Une formulation ou un nom de capacité précis |
| Déplacement par l'agent | L'état source perd un, l'état de destination gagne un, le total ne bouge pas | Quelle tâche, ou une répartition finale précise |
| Filtre | Le nombre visible reste au plus égal au total, les données stockées ne changent pas, et le retrait du filtre restaure le nombre visible antérieur | Un nombre visible exact |
| Réouverture, seulement si répétée | Chaque valeur observée avant la fermeture est présente ensuite | Que la réouverture fonctionne, avant de l'avoir testée |

Ne vérifiez que des valeurs machine. Les clés d'état, les clés de priorité et les identifiants traversent la traduction ; les libellés affichés, non. Un groupe francophone qui chercherait un libellé de commande précis ferait échouer des réalisations correctes : aucune vérification de cette page ne nomme donc un texte affiché, dans quelque langue que ce soit.

Attendez-vous à un résultat partiellement bilingue. Une instruction de langue dans une invite oriente une partie de la sortie seulement : les identifiants générés, les messages de validation et les commentaires de code restent souvent en anglais. Annoncez-le en section 1 et présentez-le comme une observation à faire, pas comme un défaut à signaler.

La persistance est une implémentation demandée, pas une garantie de la plateforme, et aucun geste de réouverture n'a été établi. Le point de contrôle de réouverture ne fait pas partie du parcours français.

## Décisions confiées aux personnes apprenantes

Ces trois moments sont obligatoires, et non des prolongements facultatifs. Ils distinguent cette séance d'une démonstration guidée accompagnée d'invites à copier.

* Section 2 : chaque personne retire un élément du plan proposé par l'agent et écrit une phrase justifiant ce retrait. C'est le seul moment où une décision humaine conditionne réellement l'exécution.
* Section 3 : une fois que l'agent annonce une réussite, chaque personne note une affirmation de l'agent qu'elle n'a pas constatée elle-même.
* Section 4 : chaque personne rédige sa propre invite d'amélioration. La formulation fournie ne sert de recours qu'après trois minutes.

## Barres d'acceptation par parcours

Les deux parcours avancent au même rythme, dans le même budget de temps, et se distinguent par ce qui compte comme terminé. L'affectation se fait à l'inscription, à partir d'une question d'auto-évaluation, en asseyant si possible une personne du parcours avancé à côté d'une personne du parcours d'introduction.

| Parcours | Barre d'acceptation | Seconde barre |
| --- | --- | --- |
| Introduction | Ajouter par l'interface et déplacer par l'agent, en satisfaisant les lignes correspondantes ci-dessus | Nommer une affirmation de l'agent non constatée |
| Avancé | Satisfaire en plus l'invariant du filtre et le refus des titres vides par les deux voies | Rédiger une vérification de non-régression dans ses propres mots et réviser le travail de sa ou son binôme |

Une phrase supplémentaire par section ne constitue pas un parcours. Si l'une des barres disparaît, retirez aussi la distinction plutôt que de la présenter comme une différenciation.

## Incidents pendant la séance

Une correspondance avec du code public peut apparaître même sous une politique de blocage. Trente secondes d'explication suffisent, données en section 1 plutôt qu'improvisées en section 3. La marche à suivre : s'arrêter, ne rien construire de plus sur cette sortie, la noter et la signaler à l'animation.

Si une solution de protection met une extension générée en quarantaine, la personne s'arrête, prévient l'animation et bascule vers le canevas de référence. L'animation prévient le contact nommé consigné en G13. Sur vingt appareils gérés, cela se produira au moins une fois : nommez donc le contact avant la séance plutôt que d'en chercher un pendant.

Consignez le nombre d'abandons et le motif de chacun. Une séance où huit personnes ont discrètement pris le canevas de référence et une séance où personne ne l'a fait sont deux résultats différents, et seul le décompte consigné les distingue.
