CREATE OR REPLACE TRIGGER trg_foliador_estados
FOR INSERT OR UPDATE OF id_estado ON fosiles.estados
COMPOUND TRIGGER

  BEFORE EACH ROW IS
  BEGIN
    
    SELECT NVL(MAX(id_estado), 0) + 1
    INTO   :NEW.id_estado
    FROM   estados
    WHERE  id_pais = :NEW.id_pais;
    
  END BEFORE EACH ROW;

END;