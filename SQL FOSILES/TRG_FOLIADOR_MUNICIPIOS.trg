CREATE OR REPLACE TRIGGER trg_foliador_municipios
BEFORE INSERT OR UPDATE OF id_municipio ON fosiles.municipios
FOR EACH ROW

BEGIN
    
    :NEW.id_municipio := municipio_id.nextval;

END;