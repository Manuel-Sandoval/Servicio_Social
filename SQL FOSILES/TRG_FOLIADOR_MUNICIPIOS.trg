CREATE OR REPLACE TRIGGER trg_foliador_municipios
FOR INSERT OR UPDATE OF id_municipio ON fosiles.municipios
COMPOUND TRIGGER

  BEFORE EACH ROW IS
  BEGIN
    
    SELECT NVL(MAX(id_municipio), 0) + 1
    INTO   :NEW.id_municipio
    FROM   municipios
    WHERE  id_pais = :NEW.id_pais
    AND    id_estado = :NEW.id_estado;
    
  END BEFORE EACH ROW;

END;