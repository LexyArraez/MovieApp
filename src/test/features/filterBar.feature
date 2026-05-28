Feature: Barra de filtros
  Como usuario de la app de películas
  Quiero seleccionar y limpiar filtros
  Para ver las películas que coincidan con mis preferencias


  Scenario: Seleccionar un género
    Given hay géneros disponibles
    When el usuario hace click en "Acción"
    Then se llama a onGenreChange con 28
    

  Scenario: Seleccionar un rating
    Given el filtro de rating actual es "6+"
    When el usuario hace click en "7+"
    Then se llama a onRatingChange con 7

  Scenario: Activar el filtro de tendencia
    Given el filtro de tendencia está desactivado
    When el usuario hace click en "Tendencia"
    Then se llama a onTrendingChange con true

  Scenario: Quitar filtros activos uno por uno
    Given hay un género activo y tendencia activa
    When el usuario hace click en "Quitar filtro Acción"
    Then se llama a onGenreChange con null
    And se llama a onTrendingChange con false

  Scenario: Limpiar todos los filtros activos
    Given hay varios filtros activos
    When el usuario hace click en "Limpiar todo"
    Then se llama a onClearAll
