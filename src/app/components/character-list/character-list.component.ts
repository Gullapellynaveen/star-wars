import { Component, OnInit } from '@angular/core';
import { StarWarsService } from 'src/app/services/star-wars.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.less']
})
export class CharacterListComponent implements OnInit {

  characters: any[] = [];
  paginatedCharacters: any[] = [];
  filteredCharacters: any[] = [];
  birthYears: string[] = [];
  starships: any[] = [];
  species: any[] = [];
  vehicles: any[] = [];
  films: any[] = [];
  pages: number[] = [];
  displayedColumns: string[] = ['number', 'name', 'species', 'birth_year'];
  filters = {
    movie: '',
    species: '',
    birthYear: '',
    starship: '',
    vehicle: '',
  };

  pageSize: number = 5;
  currentPage: number = 1;

  constructor(private starWarsService: StarWarsService) { }

  ngOnInit() {
    this.starWarsService.getAllCharacters().subscribe(data => {
      this.characters = data.results;
      this.applyFilters();
      this.extractBirthYears();
    });

    this.starWarsService.getFilms().subscribe(data => {
      this.films = data.results;
    });
    this.starWarsService.getAllSpecies().subscribe(data => {
      this.species = data.results;
    });

    this.starWarsService.getAllVehicles().subscribe(data => {
      this.vehicles = data.results;
    });

    this.starWarsService.getAllStarships().subscribe(data => {
      this.starships = data.results;
    });
  }

  extractBirthYears(): void {
    const years = this.characters.map(character => character.birth_year).filter(year => year);
    this.birthYears = Array.from(new Set(years));
  }

  applyFilters() {
    this.filteredCharacters = this.characters.filter(character => {
      return (
        (!this.filters.movie || character.films.includes(this.filters.movie)) &&
        (!this.filters.species || character.species.includes(this.filters.species)) &&
        (!this.filters.vehicle || character.vehicles.includes(this.filters.vehicle)) &&
        (!this.filters.starship || character.starships.includes(this.filters.starship)) &&
        (!this.filters.birthYear || character.birth_year === this.filters.birthYear)
      );
    });
    this.setPages();
    this.setPage(1);

    this.filteredCharacters.forEach(character => {
      if (character.species.length > 0) {
        this.starWarsService.getSpecies(character.species[0]).subscribe(species => {
          character.speciesName = species.name;
        });
      } else {
        character.speciesName = 'Not Available'; // Handle cases where species array is empty
      }
    });
  }

  setPages() {
    this.pages = [];
    for (let i = 1; i <= Math.ceil(this.filteredCharacters.length / this.pageSize); i++) {
      this.pages.push(i);
    }
  }

  setPage(page: number) {
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedCharacters = this.filteredCharacters.slice(startIndex, endIndex);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.setPage(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.pages.length) {
      this.setPage(this.currentPage + 1);
    }
  }
}
