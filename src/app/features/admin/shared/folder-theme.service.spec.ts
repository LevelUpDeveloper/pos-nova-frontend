import { TestBed } from '@angular/core/testing';

import { FOLDER_PRESETS, FOLDER_THEME_STORAGE_KEY } from '../admin.config';
import { FolderThemeService } from './folder-theme.service';

describe('FolderThemeService', () => {
  const [cream, manila] = FOLDER_PRESETS;
  const create = () => {
    TestBed.configureTestingModule({ providers: [FolderThemeService] });
    return TestBed.inject(FolderThemeService);
  };

  beforeEach(() => localStorage.clear());

  it('usa la paleta predeterminada si no hay nada guardado o es inválido', () => {
    localStorage.setItem(FOLDER_THEME_STORAGE_KEY, '{"paper":"url(x)"}');
    const service = create();
    expect(service.palette()).toEqual(cream.palette);
    expect(service.activePresetId()).toBe(cream.id);
  });

  it('la vista previa no se guarda hasta confirmar', () => {
    const service = create();
    service.startEditing();
    service.preview(manila.palette);
    expect(service.palette()).toEqual(manila.palette);
    service.cancel();
    expect(service.palette()).toEqual(cream.palette);
    expect(localStorage.getItem(FOLDER_THEME_STORAGE_KEY)).toBeNull();
  });

  it('guarda la paleta y la recupera', () => {
    create().preview(manila.palette);
    TestBed.inject(FolderThemeService).save();
    TestBed.resetTestingModule();
    expect(create().palette()).toEqual(manila.palette);
  });

  it('ignora colores inválidos y no guarda paletas ilegibles', () => {
    const service = create();
    service.startEditing();
    service.setColor('ink', 'red');
    expect(service.palette().ink).toBe(cream.palette.ink);
    service.setColor('ink', cream.palette.paper);
    expect(service.readable()).toBe(false);
    expect(service.save()).toBe(false);
    expect(localStorage.getItem(FOLDER_THEME_STORAGE_KEY)).toBeNull();
  });
});
