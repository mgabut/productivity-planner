import { Component, signal } from '@angular/core';
import { HomeBannerDumbComponent } from './home-banner/home-banner.dumb.component';
import { HomepageFeatureCardListDumbComponent } from "./homepage-feature-card-list/homepage-feature-card-list.dumb.component";
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [HomeBannerDumbComponent, HomepageFeatureCardListDumbComponent, MatIconModule],
  templateUrl: './home.page.component.html',
  styleUrl: './home.page.component.scss'
})
export class HomePageComponent {

  featureCardList = signal([
    {
      name: 'Planifier sa semaine',
      icon: 'event_note',
      description: 'Visibilité sur les 7 prochains jours',
    },
    {
      name: 'Atteindre ses objectifs',
      icon: 'bar_chart',
      description: 'Priorisation des tâches',
    },
    {
      name: 'Analyser sa productivité',
      icon: 'emoji_events',
      description: 'Visualiser le travail accompli',
    },
  ]);

  onBannerClicked(){
    console.log('Banner Clicked')
  }
}
