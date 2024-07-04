import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StarWarsService } from 'src/app/services/star-wars.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.less']
})
export class CharacterDetailComponent implements OnInit {

  character: any = {};
  films: any[] = [];
  vehicles: any[] = [];
  starships: any[] = [];
  species: any = {};
  panet: any = {};

  constructor(
    private route: ActivatedRoute,
    private starWarsService: StarWarsService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.starWarsService.getCharacter(id).subscribe(data => {
      this.character = data;

      // Fetch species details if character has species
      if (this.character.species.length > 0) {
        this.starWarsService.getSpecies(this.character.species[0]).subscribe(species => {
          this.species = species;
        });
      }

      // Fetch panet details
      this.starWarsService.getpanet(this.character.homeworld).subscribe(panet => {
        this.panet = panet;
      });

      // Fetch other details (films, vehicles, starships)
      this.fetchFilms();
      this.fetchVehicles();
      this.fetchStarships();
    });
  }

  fetchFilms() {
    this.character.films.forEach((filmUrl: string) => {
      this.starWarsService.getMovies(filmUrl).subscribe(
        film => {
          this.films.push(film);
        },
        error => {
          console.error('Error fetching film:', error);
          this.films.push({ title: 'Not Available' }); // Push a placeholder
        }
      );
    });
    if (this.character.films.length === 0) {
      this.films.push({ title: 'Not Available' });
    }
  }

  fetchVehicles() {
    this.character.vehicles.forEach((vehicleUrl: string) => {
      this.starWarsService.getVehicles(vehicleUrl).subscribe(
        vehicle => {
          this.vehicles.push(vehicle);
        },
        error => {
          console.error('Error fetching vehicle:', error);
          this.vehicles.push({ name: 'Not Available' }); // Push a placeholder
        }
      );
    });
    if (this.character.vehicles.length === 0) {
      this.vehicles.push({ name: 'Not Available' });
    }
  }

  fetchStarships() {
    this.character.starships.forEach((starshipUrl: string) => {
      this.starWarsService.getStarships(starshipUrl).subscribe(
        starship => {
          this.starships.push(starship);
        },
        error => {
          console.error('Error fetching starship:', error);
          this.starships.push({ name: 'Not Available' });
        }
      );
    });
    if (this.character.starships.length === 0) {
      this.starships.push({ name: 'Not Available' });
    }
  }
}
